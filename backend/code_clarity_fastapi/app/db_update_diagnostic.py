import os 
import asyncio
import logging
from typing import List, Dict, Set
from datetime import datetime

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class DatabaseUpdateDiagnostic:
    def __init__(self, base_dir: str):
        self.base_dir = base_dir
        self.data_dir = os.path.join(base_dir, 'code_clarity_fastapi', 'data')
        
    async def run_diagnostics(self) -> Dict:
        """Run comprehensive diagnostics on database update process."""
        results = {
            'timestamp': datetime.now().isoformat(),
            'file_system': {},
            'database': {},
            'processing': {},
            'errors': []
        }
        
        try:
            # Check file system
            results['file_system'] = await self.check_file_system()
            
            # Check database connectivity and state
            results['database'] = await self.check_database()
            
            # Test file processing
            results['processing'] = await self.test_file_processing()
            
        except Exception as e:
            results['errors'].append(f"Critical error during diagnostics: {str(e)}")
            logger.error(f"Diagnostic failure: {str(e)}", exc_info=True)
            
        return results
    
    async def check_file_system(self) -> Dict:
        """Check file system state and accessibility."""
        fs_results = {
            'directory_exists': False,
            'question_files': [],
            'solution_files': [],
            'unpaired_files': [],
            'invalid_files': []
        }
        
        try:
            # Check if data directory exists
            fs_results['directory_exists'] = os.path.exists(self.data_dir)
            if not fs_results['directory_exists']:
                raise FileNotFoundError(f"Data directory not found: {self.data_dir}")
            
            # Get all markdown files
            question_dir = os.path.join(self.data_dir, 'question_bank')
            solution_dir = os.path.join(self.data_dir, 'solution_bank')
            
            question_files = self._get_markdown_files(question_dir)
            solution_files = self._get_markdown_files(solution_dir)
            
            # Store file lists
            fs_results['question_files'] = [os.path.basename(f) for f in question_files]
            fs_results['solution_files'] = [os.path.basename(f) for f in solution_files]
            
            # Find unpaired files
            question_ids = {FileManager.extract_id_from_filename(os.path.basename(f)) for f in question_files}
            solution_ids = {FileManager.extract_id_from_filename(os.path.basename(f)) for f in solution_files}
            
            unpaired_questions = question_ids - solution_ids
            unpaired_solutions = solution_ids - question_ids
            
            fs_results['unpaired_files'] = {
                'questions_without_solutions': list(unpaired_questions),
                'solutions_without_questions': list(unpaired_solutions)
            }
            
            # Check for invalid filenames
            fs_results['invalid_files'] = [
                f for f in fs_results['question_files'] + fs_results['solution_files']
                if not re.match(r'^\d+_[\w-]+\.md$', f)
            ]
            
        except Exception as e:
            fs_results['error'] = str(e)
            logger.error(f"File system check failed: {str(e)}", exc_info=True)
            
        return fs_results
    
    async def check_database(self) -> Dict:
        """Check database state and connectivity."""
        db_results = {
            'connection': False,
            'questions_count': 0,
            'solutions_count': 0,
            'categories': [],
            'error': None
        }
        
        try:
            # Initialize database manager
            db_manager = DatabaseManager()
            
            # Test connection
            await db_manager.db.command('ping')
            db_results['connection'] = True
            
            # Get counts
            db_results['questions_count'] = await db_manager.db.questions.count_documents({})
            db_results['solutions_count'] = await db_manager.db.solutions.count_documents({})
            
            # Get categories
            db_results['categories'] = await db_manager.get_categories()
            
        except Exception as e:
            db_results['error'] = str(e)
            logger.error(f"Database check failed: {str(e)}", exc_info=True)
            
        return db_results
    
    async def test_file_processing(self) -> Dict:
        """Test processing of files."""
        processing_results = {
            'processed_files': [],
            'failed_files': [],
            'errors': []
        }
        
        try:
            db_manager = DatabaseManager()
            file_manager = FileManager()
            question_manager = QuestionManager(db_manager, file_manager, self.base_dir)
            
            # Get test files
            question_files = _get_markdown_files(os.path.join(self.data_dir, 'question_bank'))
            solution_files = _get_markdown_files(os.path.join(self.data_dir, 'solution_bank'))
            
            # Process a sample of files
            sample_size = min(5, len(question_files))
            for file_path in question_files[:sample_size]:
                try:
                    question_id = FileManager.extract_id_from_filename(os.path.basename(file_path))
                    result = await question_manager.process_question(question_id, force_update=True)
                    
                    if result:
                        processing_results['processed_files'].append(os.path.basename(file_path))
                    else:
                        processing_results['failed_files'].append(os.path.basename(file_path))
                        
                except Exception as e:
                    processing_results['errors'].append(f"Error processing {file_path}: {str(e)}")
                    
        except Exception as e:
            processing_results['errors'].append(f"Critical processing error: {str(e)}")
            logger.error(f"File processing test failed: {str(e)}", exc_info=True)
            
        return processing_results
    
    @staticmethod
    def _get_markdown_files(directory: str) -> List[str]:
        """Get all markdown files from directory and subdirectories."""
        if not os.path.exists(directory):
            return []
            
        markdown_files = []
        for root, _, files in os.walk(directory):
            for file in files:
                if file.endswith('.md') and re.match(r'^(\d+)_', file):
                    markdown_files.append(os.path.join(root, file))
        return markdown_files

# Usage example
async def run_diagnostics(base_dir: str):
    diagnostic = DatabaseUpdateDiagnostic(base_dir)
    results = await diagnostic.run_diagnostics()
    
    print("\n=== Database Update Diagnostic Results ===\n")
    
    # File System Results
    print("File System Check:")
    print(f"Data Directory Exists: {results['file_system']['directory_exists']}")
    print(f"Question Files Found: {len(results['file_system']['question_files'])}")
    print(f"Solution Files Found: {len(results['file_system']['solution_files'])}")
    if results['file_system']['unpaired_files']['questions_without_solutions']:
        print("\nQuestions without solutions:", results['file_system']['unpaired_files']['questions_without_solutions'])
    if results['file_system']['unpaired_files']['solutions_without_questions']:
        print("\nSolutions without questions:", results['file_system']['unpaired_files']['solutions_without_questions'])
    if results['file_system']['invalid_files']:
        print("\nInvalid filenames found:", results['file_system']['invalid_files'])
        
    # Database Results
    print("\nDatabase Check:")
    print(f"Connection Successful: {results['database']['connection']}")
    print(f"Questions in Database: {results['database']['questions_count']}")
    print(f"Solutions in Database: {results['database']['solutions_count']}")
    if results['database']['error']:
        print(f"Database Error: {results['database']['error']}")
        
    # Processing Results
    print("\nProcessing Check:")
    print(f"Successfully Processed: {len(results['processing']['processed_files'])}")
    print(f"Failed to Process: {len(results['processing']['failed_files'])}")
    if results['processing']['errors']:
        print("\nProcessing Errors:")
        for error in results['processing']['errors']:
            print(f"- {error}")
            
    return results