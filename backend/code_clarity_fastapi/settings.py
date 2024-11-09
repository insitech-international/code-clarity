import enum
import os
from functools import lru_cache
from pathlib import Path
from typing import Optional, List
import logging

# Logging Settings
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants (Read from .env file now)
GITHUB_STATIC_FILES_DIRECTORY = os.getenv("CODE_CLARITY_STATIC_FILES_DIRECTORY", "https://raw.githubusercontent.com/insitech-international/code-clarity/gh-pages/static/data")
API_LOCAL_BASE = os.getenv("CODE_CLARITY_API_LOCAL_BASE", "http://127.0.0.1:8000")
API_PROD_BASE = os.getenv("CODE_CLARITY_API_PROD_BASE", "https://code-clarity.insitechinternational.com")


class Environment(str, enum.Enum):
    """Possible environment types."""
    DEVELOPMENT = "development"
    STAGING = "staging"
    PRODUCTION = "production"
    
    @classmethod
    def from_string(cls, value: str) -> "Environment":
        """Convert various string formats to valid environment enum."""
        value_map = {
            "dev": cls.DEVELOPMENT,
            "development": cls.DEVELOPMENT,
            "stage": cls.STAGING,
            "staging": cls.STAGING,
            "prod": cls.PRODUCTION,
            "production": cls.PRODUCTION
        }
        normalized = value.lower().strip()
        if normalized not in value_map:
            raise ValueError(
                f"Invalid environment '{value}'. Must be one of: {', '.join(value_map.keys())}"
            )
        return value_map[normalized]


class Settings:
    """Application settings."""
    
    # Environment Settings
    environment: Environment = Environment.from_string(os.getenv("CODE_CLARITY_ENVIRONMENT", "development"))
    debug: bool = os.getenv("CODE_CLARITY_DEBUG", "true").lower() == "true"
    base_dir: Optional[Path] = None
    app_name: str = "Code Clarity API"
    app_version: str = "1.0.0"
    app_description: str = "API for coding questions and solutions"
    
    # API Settings
    host: str = os.getenv("CODE_CLARITY_HOST", "127.0.0.1")
    port: int = int(os.getenv("CODE_CLARITY_PORT", 8000))
    workers_count: int = int(os.getenv("CODE_CLARITY_WORKERS_COUNT", 1))
    reload: bool = os.getenv("CODE_CLARITY_RELOAD", "false").lower() == "true"
    
    # Database Settings
    use_mongodb: bool = os.getenv("CODE_CLARITY_DB_HOST") is not None
    db_host: str = os.getenv("CODE_CLARITY_DB_HOST", "localhost")
    db_port: int = int(os.getenv("CODE_CLARITY_DB_PORT", 27017))
    db_user: Optional[str] = os.getenv("CODE_CLARITY_DB_USER")
    db_pass: Optional[str] = os.getenv("CODE_CLARITY_DB_PASS")
    db_base: str = os.getenv("CODE_CLARITY_DB_BASE", "code-clarity-db")
    db_auth_source: Optional[str] = os.getenv("CODE_CLARITY_DB_AUTH_SOURCE")
    db_echo: bool = os.getenv("CODE_CLARITY_DB_ECHO", "false").lower() == "true"
    
    # Static Files Settings
    static_timeout: int = int(os.getenv("CODE_CLARITY_STATIC_TIMEOUT", 5))
    static_files_directory: str = os.getenv("CODE_CLARITY_STATIC_FILES_DIRECTORY", "static/data")
    static_data_path: str = "static/data"
    
    # GitHub Settings
    github_owner: str = os.getenv("CODE_CLARITY_GITHUB_OWNER", "insitech-international")
    github_repo: str = os.getenv("CODE_CLARITY_GITHUB_REPO", "code-clarity")
    github_branch: str = os.getenv("CODE_CLARITY_GITHUB_BRANCH", "gh-pages")
    
    # CORS Settings
    allowed_origins: List[str] = os.getenv("CODE_CLARITY_ALLOWED_ORIGINS", "").split(",")
    
    # Production-specific Settings
    api_prod_base: str = os.getenv("CODE_CLARITY_API_PROD_BASE", API_PROD_BASE)

    def __init__(self):
        self._set_static_files_directory()
        self._set_debug_mode()
        self._validate_settings()
        self._set_base_dir()

    def _set_base_dir(self) -> None:
        """Set the base directory for the application."""
        if self.base_dir is None:
            current_file = Path(__file__)
            project_root = current_file.parent.parent.parent
            self.base_dir = project_root

    def _set_static_files_directory(self) -> None:
        """Set the static file directory based on the environment."""
        if self.environment != Environment.DEVELOPMENT:
            self.static_files_directory = GITHUB_STATIC_FILES_DIRECTORY

    def _set_debug_mode(self) -> None:
        """Set debug mode based on environment."""
        if self.environment == Environment.PRODUCTION:
            self.debug = False
            self.reload = False

    def _validate_settings(self) -> None:
        """Validate critical settings."""
        if self.environment == Environment.PRODUCTION:
            assert self.static_files_directory and "githubusercontent.com" in self.static_files_directory, \
                "Production environment must use GitHub static content"

    @property
    def is_using_static_data(self) -> bool:
        """Check if using GitHub static data."""
        return "githubusercontent.com" in (self.static_files_directory or "")

    @property
    def api_base_url(self) -> str:
        """Get the base API URL for the current environment."""
        return API_PROD_BASE if self.environment == Environment.PRODUCTION else API_LOCAL_BASE

    @property
    def db_url(self) -> str:
        """Assemble database URL from settings."""
        if self.db_user and self.db_pass:
            return f"mongodb://{self.db_user}:{self.db_pass}@{self.db_host}:{self.db_port}/{self.db_base}"
        return f"mongodb://{self.db_host}:{self.db_port}/{self.db_base}"


@lru_cache()
def get_settings() -> Settings:
    """Create cached instance of settings."""
    return Settings()

settings = get_settings()
