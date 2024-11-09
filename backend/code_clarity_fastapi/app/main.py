# In code_clarity_fastapi/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from pathlib import Path
from code_clarity_fastapi.app.routes import router, initialize
from code_clarity_fastapi.app.file_manager import DatabaseManager, FileManager, QuestionManager, update_database
from code_clarity_fastapi.settings import settings

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version=settings.app_version,
)

# Explicitly define CORS origins
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:8000",
    "https://code-clarity.insitechinternational.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=[
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "X-Requested-With",
    ],
    expose_headers=["*"],
    max_age=3600,
)

# Ensure base_dir is properly set
base_dir = Path(__file__).parent.parent.parent
settings.base_dir = base_dir

db_manager = DatabaseManager()
file_manager = FileManager()
question_manager = QuestionManager(db_manager, file_manager, base_dir)

# Initialize the managers in the routes
initialize(question_manager, db_manager)

# Include the router
app.include_router(router)

@app.on_event("startup")
async def startup_event():
    logger.info(f"Starting up the application from {base_dir}")
    try:
        await update_database(base_dir)
        logger.info("Database update completed successfully")
    except Exception as e:
        logger.error(f"Error during database update: {str(e)}", exc_info=True)
        # Don't raise the exception - log it and continue startup
        # This allows the app to start even if there are data issues

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.reload,
        log_level="info",
    )