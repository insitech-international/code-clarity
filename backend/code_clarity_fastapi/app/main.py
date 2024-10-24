from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from code_clarity_fastapi.app.routes import router, initialize
from code_clarity_fastapi.app.file_manager import DatabaseManager, FileManager, QuestionManager, update_database
from code_clarity_fastapi.settings import settings

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3001",  # Your local development frontend URL
        "https://code-clarity.insitechinternational.com",  # Your production custom domain
        "https://b9a9-5-133-46-243.ngrok-free.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_manager = DatabaseManager()
file_manager = FileManager()
question_manager = QuestionManager(db_manager, file_manager, settings.base_dir)

# Initialize the managers in the routes
initialize(question_manager, db_manager)

# Include the single router from routes.py
app.include_router(router)

@app.on_event("startup")
def startup_event():
    logger.info("Starting up the application")
    try:
        update_database(settings.base_dir)
        logger.info("Database update completed successfully")
    except Exception as e:
        logger.error(f"Error during database update: {str(e)}", exc_info=True)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.host, port=settings.port)
