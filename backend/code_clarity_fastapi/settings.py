from enum import Enum
from functools import lru_cache
from pathlib import Path
from typing import Optional, List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator, Field, computed_field

class LogLevel(str, Enum):
    """Possible log levels."""
    NOTSET = "NOTSET"
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    FATAL = "FATAL"

class Environment(str, Enum):
    """Possible environment types."""
    DEVELOPMENT = "development"
    STAGING = "staging"
    PRODUCTION = "production"

class Settings(BaseSettings):
    """
    Application settings.

    These parameters can be configured with environment variables.
    All environment variables are prefixed with CODE_CLARITY_
    """
    # Application Info
    app_name: str = "Code Clarity API"
    app_version: str = "1.0.0"
    app_description: str = "API for coding questions and solutions"
    
    # Server Settings
    host: str = "127.0.0.1"
    port: int = 8000
    workers_count: int = 1
    reload: bool = False
    
    # Environment Settings
    environment: str = "development"
    debug: bool = True
    base_dir: Optional[Path] = None
    
    # Database Settings
    db_host: str = "localhost"
    db_port: int = 27017
    db_user: Optional[str] = None
    db_pass: Optional[str] = None
    db_base: str = "code-clarity-db"
    db_auth_source: Optional[str] = None
    db_echo: bool = False
    
    # Logging
    log_level: LogLevel = LogLevel.INFO
    
    # Static Files Settings
    static_timeout: int = 5
    static_files_directory: str = "static/data"
    static_data_path: str = "static/data"
    
    # GitHub Settings
    github_owner: str = "insitech-international"
    github_repo: str = "code-clarity"
    github_branch: str = "gh-pages"
    github_static_base: str = Field(
        default="https://raw.githubusercontent.com/insitech-international/code-clarity/gh-pages/static/data"
    )
    
    # API URLs
    api_local_base: str = "http://127.0.0.1:8000"
    api_prod_base: str = "https://code-clarity.insitechinternational.com"
    
    # CORS Settings
    allowed_origins: List[str] = Field(default_factory=list)
    
    # React App Settings
    react_app_api_url: str = Field(default="https://code-clarity.insitechinternational.com")
    react_app_use_static: bool = True
    react_app_data_source: str = "github"
    react_app_static_url: str = Field(
        default="https://raw.githubusercontent.com/user/code-clarity/gh-pages/static/data"
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="CODE_CLARITY_",
        env_file_encoding="utf-8",
        use_enum_values=True,
        validate_default=True,
    )

    @field_validator('environment')
    def validate_environment(cls, v: str) -> str:
        """Validate and normalize environment setting."""
        env_map = {
            "dev": "development",
            "development": "development",
            "stage": "staging",
            "staging": "staging",
            "prod": "production",
            "production": "production"
        }
        normalized = v.lower().strip()
        if normalized not in env_map:
            raise ValueError(
                f"Invalid environment '{v}'. Must be one of: {', '.join(env_map.keys())}"
            )
        return env_map[normalized]

    @field_validator('allowed_origins')
    def validate_allowed_origins(cls, v: List[str]) -> List[str]:
        """Convert comma-separated string to list if necessary."""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v

    @computed_field
    @property
    def db_url(self) -> str:
        """Assemble database URL from settings."""
        if self.db_user and self.db_pass:
            return f"mongodb://{self.db_user}:{self.db_pass}@{self.db_host}:{self.db_port}/{self.db_base}"
        return f"mongodb://{self.db_host}:{self.db_port}/{self.db_base}"

    @computed_field
    @property
    def is_development(self) -> bool:
        """Check if environment is development."""
        return self.environment == "development"

    @computed_field
    @property
    def is_production(self) -> bool:
        """Check if environment is production."""
        return self.environment == "production"

    @computed_field
    @property
    def api_base_url(self) -> str:
        """Get the base API URL for the current environment."""
        return self.api_prod_base if self.is_production else self.api_local_base

    @computed_field
    @property
    def is_using_static_data(self) -> bool:
        """Check if using GitHub static data."""
        return "githubusercontent.com" in (self.static_files_directory or "")

    def _initialize_settings(self) -> None:
        """Initialize additional settings based on environment."""
        if self.is_production:
            self.debug = False
            self.reload = False
            self.static_files_directory = self.github_static_base
            
        if self.base_dir is None:
            self.base_dir = Path(__file__).parent.parent.parent

@lru_cache()
def get_settings() -> Settings:
    """Create and cache settings instance."""
    settings = Settings()
    settings._initialize_settings()
    return settings

# Create settings instance
settings = get_settings()