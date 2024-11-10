import re
from fastapi import APIRouter, HTTPException, Query, Request
from typing import List, Optional, Dict, Any
from code_clarity_fastapi.app.schemas import QuestionSchema, SolutionSchema
from code_clarity_fastapi.app.file_manager import update_database, DatabaseManager, FileManager, QuestionManager
from code_clarity_fastapi.settings import settings
import logging
import json
from bson import json_util
from motor.motor_asyncio import AsyncIOMotorCursor

router = APIRouter()
logger = logging.getLogger(__name__)

# Global managers to be initialized
question_manager = None
db_manager = None

def initialize(qm: QuestionManager, dbm: DatabaseManager):
    global question_manager, db_manager
    question_manager = qm
    db_manager = dbm

@router.get("/")
async def root():
    """Root endpoint that provides API information"""
    return {
        "status": "online",
        "version": "1.0",
        "endpoints": {
            "categories": "/categories/",
            "questions": "/questions/",
            "solutions": "/solutions/{question_id}",
            "featured": "/featured_questions/"
        }
    }

@router.get("/categories/")
async def list_categories(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100)
):
    try:
        # Make sure db_manager is initialized
        if not db_manager:
            raise HTTPException(
                status_code=500,
                detail="Database manager not initialized"
            )
            
        # Get distinct categories from questions collection
        cursor = db_manager.db.questions.aggregate([
            {"$group": {"_id": "$category"}},
            {"$match": {"_id": {"$ne": None}}},
            {"$sort": {"_id": 1}},
            {"$skip": skip},
            {"$limit": limit}
        ])
        
        categories = []
        async for doc in cursor:
            if doc["_id"]:  # Ensure category is not None or empty
                categories.append(doc["_id"])
                
        return categories
        
    except Exception as e:
        logger.error(f"Error fetching categories: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/featured_questions/")
async def featured_questions():
    try:
        categories = await db_manager.get_categories()
        featured_questions = {}
        for category in categories:
            cursor = db_manager.db.questions.find({"category": category}).limit(6)
            questions = await cursor.to_list(length=6)
            featured_questions[category] = [
                QuestionSchema(**question) for question in questions
            ]
        return featured_questions
    except Exception as e:
        logger.error(f"Error fetching featured questions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/questions/", response_model=Dict[str, Any])
async def list_questions(
    search: Optional[str] = None,
    category: Optional[str] = None,
    difficulty: Optional[str] = None,
    company: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100)
):
    try:
        # Build filters
        filters: Dict[str, Any] = {}
        if category:
            filters['category'] = category
        if difficulty:
            filters['difficulty'] = difficulty
        if company:
            filters['company'] = company

        if search:
            search_words = search.lower().split()
            regex_pattern = '|'.join(map(re.escape, search_words))
            filters['$or'] = [
                {'title': {'$regex': regex_pattern, '$options': 'i'}},
                {'content': {'$regex': regex_pattern, '$options': 'i'}},
                {'tags': {'$in': search_words}}
            ]

        # Get total count
        total = await db_manager.db.questions.count_documents(filters)
        
        # Get questions
        cursor = db_manager.db.questions.find(filters).skip(skip).limit(limit)
        questions = await cursor.to_list(length=limit)
        
        if not questions:
            return {
                "questions": [],
                "total": 0,
                "skip": skip,
                "limit": limit
            }

        # Convert to Pydantic models
        question_models = [QuestionSchema(**question) for question in questions]
        
        # Convert to JSON-compatible format
        questions_json = json.loads(json_util.dumps([
            question.dict(by_alias=True) for question in question_models
        ]))

        return {
            "questions": questions_json,
            "total": total,
            "skip": skip,
            "limit": limit
        }
        
    except Exception as e:
        logger.error(f"Error fetching questions: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/questions/{question_id}", response_model=QuestionSchema)
async def get_question(question_id: int):
    try:
        question_doc = await db_manager.db.questions.find_one({"question_id": question_id})
        if not question_doc:
            logger.warning(f"Question not found in database: {question_id}")
            raise HTTPException(status_code=404, detail="Question not found")
        
        return QuestionSchema(**question_doc)
    except Exception as e:
        logger.error(f"Error fetching question {question_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/questions/{question_id}/content")
async def get_question_content(question_id: int):
    try:
        question_doc = await db_manager.db.questions.find_one({"question_id": question_id})
        if not question_doc:
            raise HTTPException(status_code=404, detail="Question not found")
        return {"content": question_doc.get("content", "")}
    except Exception as e:
        logger.error(f"Error fetching content for question {question_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/solutions/{question_id}", response_model=SolutionSchema)
async def get_solution(question_id: int):
    try:
        solution_doc = await db_manager.db.solutions.find_one({"question_id": question_id})
        if not solution_doc:
            logger.warning(f"Solution not found in database for question ID: {question_id}")
            raise HTTPException(status_code=404, detail="Solution not found")
        
        return SolutionSchema(**solution_doc)
    except Exception as e:
        logger.error(f"Error fetching solution for question {question_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/test-db-connection")
async def test_db_connection():
    try:
        question_doc = await db_manager.db.questions.find_one()
        if question_doc:
            return {"status": "success", "message": "Database connection successful"}
        else:
            return {"status": "warning", "message": "Database connected, but no questions found"}
    except Exception as e:
        logger.error(f"Database connection error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

# Helper methods for the DatabaseManager class
async def get_questions_list(self, filters: Dict[str, Any], skip: int = 0, limit: int = 10):
    try:
        total = await self.db.questions.count_documents(filters)
        cursor = self.db.questions.find(filters).skip(skip).limit(limit)
        questions = await cursor.to_list(length=limit)
        return questions, total
    except Exception as e:
        logger.error(f"Error in get_questions_list: {str(e)}")
        raise

async def get_categories(self) -> List[str]:
    try:
        categories = await self.db.questions.distinct("category")
        return list(filter(None, categories))  # Remove empty categories
    except Exception as e:
        logger.error(f"Error fetching categories: {str(e)}")
        raise


# Helper methods
async def get_categories_list() -> List[str]:
    """Get list of all categories"""
    try:
        if not db_manager:
            raise Exception("Database manager not initialized")
            
        cursor = db_manager.db.questions.aggregate([
            {"$group": {"_id": "$category"}},
            {"$match": {"_id": {"$ne": None}}},
            {"$sort": {"_id": 1}}
        ])
        
        categories = []
        async for doc in cursor:
            if doc["_id"]:
                categories.append(doc["_id"])
                
        return categories
        
    except Exception as e:
        logger.error(f"Error fetching categories list: {str(e)}")
        raise

# Add this at the end of your file
async def startup_event():
    """Verify database connection on startup"""
    try:
        if not db_manager:
            raise Exception("Database manager not initialized")
            
        # Test database connection
        await db_manager.db.questions.find_one()
        logger.info("Database connection verified during startup")
    except Exception as e:
        logger.error(f"Failed to connect to database during startup: {str(e)}")
        raise

@router.api_route("/update-database", methods=["GET", "POST"])
async def trigger_database_update(request: Request):
    try:
        if not db_manager:
            raise HTTPException(
                status_code=500,
                detail="Database manager not initialized"
            )

        logger.info(f"Triggering database update with base_dir: {settings.base_dir}")
        
        # Get current document count before update
        pre_update_count = await db_manager.db.questions.count_documents({})
        logger.info(f"Pre-update document count: {pre_update_count}")
        
        # Perform the database update
        try:
            await update_database(settings.base_dir)
        except Exception as update_error:
            logger.error(f"Error during update_database call: {str(update_error)}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to update database: {str(update_error)}"
            )
        
        # Get document count after update
        post_update_count = await db_manager.db.questions.count_documents({})
        logger.info(f"Post-update document count: {post_update_count}")
        
        # Compare counts to determine if update occurred
        if post_update_count >= pre_update_count:
            return {
                "message": "Database updated successfully",
                "status": "success",
                "previous_count": pre_update_count,
                "current_count": post_update_count,
                "documents_difference": post_update_count - pre_update_count
            }
        else:
            raise HTTPException(
                status_code=500,
                detail="Database update may have failed: document count decreased"
            )
            
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error during database update: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Database update failed: {str(e)}"
        )

