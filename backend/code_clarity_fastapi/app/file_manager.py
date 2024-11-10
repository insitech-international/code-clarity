import os
import re
import logging
import asyncio
from typing import List, Dict, Optional, Any, Tuple, Set
from enum import Enum
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from code_clarity_fastapi.app.schemas import QuestionSchema, SolutionSchema
from code_clarity_fastapi.settings import settings

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class BankType(Enum):
    """Enum for different types of content banks"""
    QUESTION = 'question_bank'
    SOLUTION = 'solution_bank'

class DatabaseManager:
    """Handles all database operations"""
    def __init__(self, db_url: str = str(settings.db_url), db_name: str = settings.db_base):
        self.client = AsyncIOMotorClient(db_url)
        self.db = self.client[db_name]
        self.logger = logging.getLogger(__name__)

    async def upsert_document(self, collection: str, document: Dict) -> None:
        """Upsert a document in the specified collection."""
        try:
            query = {"question_id": document["question_id"]}
            document_without_id = {k: v for k, v in document.items() if k != '_id'}
            await self.db[collection].update_one(
                query, 
                {"$set": document_without_id}, 
                upsert=True
            )
        except Exception as e:
            self.logger.error(f"Error upserting document: {str(e)}")
            raise

    async def get_document(self, collection: str, query: Dict) -> Optional[Dict]:
        """Get a single document from the specified collection."""
        try:
            return await self.db[collection].find_one(query)
        except Exception as e:
            self.logger.error(f"Error getting document: {str(e)}")
            raise

    async def get_categories(self) -> List[str]:
        """Get unique categories from questions collection."""
        try:
            categories = await self.db.questions.distinct('category')
            return sorted([cat for cat in categories if cat])
        except Exception as e:
            self.logger.error(f"Error fetching categories: {str(e)}")
            raise

    async def get_questions_list(
        self, 
        filters: Dict[str, Any], 
        skip: int = 0, 
        limit: int = 10
    ) -> Tuple[List[Dict], int]:
        """Get filtered list of questions with pagination."""
        try:
            total = await self.db.questions.count_documents(filters)
            cursor = self.db.questions.find(filters).skip(skip).limit(limit)
            questions = await cursor.to_list(length=limit)
            return questions, total
        except Exception as e:
            self.logger.error(f"Error in get_questions_list: {str(e)}")
            raise

class FileManager:
    """Handles all file operations"""
    def __init__(self):
        self.logger = logging.getLogger(__name__)

    @staticmethod
    def extract_id_from_filename(filename: str) -> int:
        """Extract the numeric ID from a filename."""
        try:
            match = re.search(r'^(\d+)', filename)
            return int(match.group(1)) if match else 0
        except (AttributeError, ValueError) as e:
            logger.error(f"Error extracting ID from filename {filename}: {str(e)}")
            return 0

    def read_file(self, file_path: str) -> str:
        """Read content from a file with proper error handling."""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return file.read()
        except FileNotFoundError:
            self.logger.error(f"File not found: {file_path}")
            raise
        except IOError as e:
            self.logger.error(f"IO error reading file {file_path}: {str(e)}")
            raise

    def parse_markdown_sections(self, content: str) -> Dict[str, str]:
        """Parse markdown content into sections."""
        sections = {}
        current_section = None
        section_content = []

        for line in content.split('\n'):
            if line.startswith('# '):
                if current_section:
                    sections[current_section] = '\n'.join(section_content).strip()
                current_section = line[2:].lower().replace(' ', '_')
                section_content = []
            else:
                section_content.append(line)

        if current_section:
            sections[current_section] = '\n'.join(section_content).strip()

        return sections

    def parse_metadata(self, content: str) -> Dict[str, Any]:
        """Parse metadata from content with improved error handling."""
        metadata = {}
        list_fields = {'similar_questions', 'real_life_domains'}
        
        try:
            for line in content.split('\n'):
                if line.strip().startswith('-'):
                    try:
                        key_value = line.strip('- ').split(':', 1)
                        if len(key_value) != 2:
                            continue
                            
                        key, value = map(str.strip, key_value)
                        key = key.strip('**').lower().replace(' ', '_')
                        
                        if not value.strip():
                            continue
                            
                        if key in list_fields:
                            metadata[key] = [item.strip() for item in value.split(',') if item.strip()]
                        else:
                            metadata[key] = value.strip()
                    except Exception as e:
                        self.logger.warning(f"Error parsing metadata line '{line}': {str(e)}")
                        continue
                        
            return metadata
        except Exception as e:
            self.logger.error(f"Error parsing metadata: {str(e)}")
            return metadata

class QuestionManager:
    """Manages question and solution processing"""
class QuestionManager:
    """Manages question and solution processing"""
    def __init__(self, db_manager: DatabaseManager, file_manager: FileManager, base_dir: str):
        self.db_manager = db_manager
        self.file_manager = file_manager
        self.base_dir = base_dir
        self.logger = logging.getLogger(__name__)

    def _find_file(self, question_id: int, bank_type: BankType) -> Optional[str]:
        """Find the file path for a given question ID and bank type."""
        try:
            data_dir = os.path.join(self.base_dir, 'code_clarity_fastapi', 'data', bank_type.value)
            
            for root, _, files in os.walk(data_dir):
                for file in files:
                    if (file.endswith('.md') and 
                        self.file_manager.extract_id_from_filename(file) == question_id):
                        return os.path.join(root, file)
            
            self.logger.warning(f"No {bank_type.value} file found for ID: {question_id}")
            return None
            
        except Exception as e:
            self.logger.error(f"Error finding file for ID {question_id} in {bank_type.value}: {str(e)}")
            return None

    async def process_question(self, question_id: int, force_update: bool = False) -> Optional[QuestionSchema]:
        """Process a question and update the database if needed."""
        try:
            question_file = self._find_file(question_id, BankType.QUESTION)
            if not question_file:
                return None

            content = self.file_manager.read_file(question_file)
            sections = self.file_manager.parse_markdown_sections(content)
            metadata = self.file_manager.parse_metadata(content)
            
            question_data = QuestionSchema(
                question_id=question_id,
                content=content,
                title=metadata.get('title', ''),
                category=metadata.get('category', ''),
                subcategory=metadata.get('subcategory', ''),
                difficulty=metadata.get('difficulty', ''),
                similar_questions=metadata.get('similar_questions', []),
                real_life_domains=metadata.get('real_life_domains', []),
                problem_description=sections.get('problem_description', ''),
                problem_versions=sections.get('versions', ''),
                constraints=sections.get('constraints', '').splitlines(),
                notes=sections.get('notes', '').splitlines()
            )
            
            if force_update or await self._should_update_question(question_id, content):
                await self.db_manager.upsert_document('questions', question_data.dict())
                
            return question_data
        except Exception as e:
            self.logger.error(f"Error processing question {question_id}: {str(e)}")
            return None

    async def process_solution(self, question_id: int, force_update: bool = False) -> Optional[SolutionSchema]:
        """Process a solution and update the database if needed."""
        try:
            solution_file = self._find_file(question_id, BankType.SOLUTION)
            if not solution_file:
                return None

            content = self.file_manager.read_file(solution_file)
            sections = self.file_manager.parse_markdown_sections(content)
            metadata = self.file_manager.parse_metadata(content)
            
            solution_data = SolutionSchema(
                question_id=question_id,
                content=content,
                title=metadata.get('title', ''),
                category=metadata.get('category', ''),
                subcategory=metadata.get('subcategory', ''),
                difficulty=metadata.get('difficulty', ''),
                similar_questions=metadata.get('similar_questions', []),
                real_life_domains=metadata.get('real_life_domains', []),
                approach=sections.get('approach', ''),
                code=sections.get('code', ''),
                explanation=sections.get('explanation', ''),
                classification_rationale=sections.get('classification_rationale', ''),
                introduction=sections.get('introduction', ''),
                mathematical_abstraction=sections.get('mathematical_abstraction', ''),
                pythonic_implementation=sections.get('pythonic_implementation', ''),
                bucesr_framework=sections.get('bucesr_framework', ''),
                complexity_analysis=sections.get('complexity_analysis', ''),
                real_world_analogies=sections.get('real_world_analogies', ''),
                storytelling_approach=sections.get('storytelling_approach', ''),
                visual_representation=sections.get('visual_representation', '')
            )
            
            if force_update or await self._should_update_solution(question_id, content):
                await self.db_manager.upsert_document('solutions', solution_data.dict())
                
            return solution_data
        except Exception as e:
            self.logger.error(f"Error processing solution {question_id}: {str(e)}")
            return None

    async def _should_update_question(self, question_id: int, content: str) -> bool:
        """Check if question needs to be updated."""
        existing = await self.db_manager.get_document('questions', {"question_id": question_id})
        return not existing or existing.get('content') != content

    async def _should_update_solution(self, question_id: int, content: str) -> bool:
        """Check if solution needs to be updated."""
        existing = await self.db_manager.get_document('solutions', {"question_id": question_id})
        return not existing or existing.get('content') != content

def validate_pairs(question_files: List[str], solution_files: List[str]) -> None:
    """Validate that each question has a corresponding solution and vice versa."""
    try:
        question_ids = {FileManager.extract_id_from_filename(os.path.basename(f)) for f in question_files}
        solution_ids = {FileManager.extract_id_from_filename(os.path.basename(f)) for f in solution_files}
        
        missing_solutions = question_ids - solution_ids
        missing_questions = solution_ids - question_ids
        
        if missing_solutions:
            logger.warning(f"Found {len(missing_solutions)} questions without solutions")
            
        if missing_questions:
            logger.warning(f"Found {len(missing_questions)} solutions without questions")
            
    except Exception as e:
        logger.error(f"Error during pair validation: {str(e)}")
        raise

async def update_database(base_dir: str) -> None:
    """Update the database with questions and solutions."""
    try:
        db_manager = DatabaseManager()
        file_manager = FileManager()
        question_manager = QuestionManager(db_manager, file_manager, base_dir)

        data_dir = os.path.join(base_dir, 'code_clarity_fastapi', 'data')
        if not os.path.exists(data_dir):
            raise FileNotFoundError(f"Data directory does not exist: {data_dir}")

        question_files = []
        solution_files = []
        
        # Get all markdown files
        for bank_type in BankType:
            bank_dir = os.path.join(data_dir, bank_type.value)
            for root, _, files in os.walk(bank_dir):
                for file in files:
                    if file.endswith('.md') and re.match(r'^(\d+)_', file):
                        full_path = os.path.join(root, file)
                        if bank_type == BankType.QUESTION:
                            question_files.append(full_path)
                        else:
                            solution_files.append(full_path)

        # Process files concurrently
        question_tasks = [
            question_manager.process_question(
                FileManager.extract_id_from_filename(os.path.basename(f)), 
                force_update=True
            )
            for f in question_files
        ]
        
        solution_tasks = [
            question_manager.process_solution(
                FileManager.extract_id_from_filename(os.path.basename(f)), 
                force_update=True
            )
            for f in solution_files
        ]
        
        # Wait for all tasks to complete
        processed_questions = len([q for q in await asyncio.gather(*question_tasks) if q])
        processed_solutions = len([s for s in await asyncio.gather(*solution_tasks) if s])

        logger.info(f"Processed {processed_questions} questions and {processed_solutions} solutions")
        validate_pairs(question_files, solution_files)

    except Exception as e:
        logger.error(f"Error updating database: {str(e)}")
        raise

# FastAPI app setup
app = FastAPI(title="Code Clarity API")

@app.on_event("startup")
async def startup_event():
    """Initialize database and process files on startup."""
    try:
        base_dir = os.getcwd()
        logger.info(f"Starting up the application from {base_dir}")
        await update_database(base_dir)
    except Exception as e:
        logger.error(f"Error during database update: {str(e)}")
        raise