from pydantic import BaseModel, Field, ConfigDict, validator
from typing import List, Optional, Any
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, _):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema: Any) -> None:
        field_schema.update(type="string")

class QuestionSchema(BaseModel):
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        populate_by_name=True,
        json_encoders={ObjectId: str}
    )

    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    question_id: int
    title: str = ""
    difficulty: str = ""
    category: str = ""
    subcategory: str = ""
    similar_questions: List[str] = Field(default_factory=list)
    real_life_domains: List[str] = Field(default_factory=list)
    problem_description: str = ""
    problem_versions: List[str] = Field(default_factory=list)
    constraints: List[str] = Field(default_factory=list)
    notes: List[str] = Field(default_factory=list)
    content: str = ""

    @validator('problem_versions', pre=True)
    def check_problem_versions(cls, v):
        if isinstance(v, str):  # if it's a single string, split into a list
            return v.split("\n")  # or any other logic for splitting
        return v

class SolutionSchema(BaseModel):
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        populate_by_name=True,
        json_encoders={ObjectId: str}
    )

    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    question_id: int
    category: Optional[str] = ""
    subcategory: Optional[str] = ""
    introduction: Optional[str] = ""
    classification_rationale: Optional[str] = ""
    pythonic_implementation: Optional[str] = ""
    bucesr_framework: Optional[str] = ""
    mathematical_abstraction: Optional[str] = ""
    real_world_analogies: Optional[str] = ""
    storytelling_approach: Optional[str] = ""
    visual_representation: Optional[str] = ""
    complexity_analysis: Optional[str] = ""
    content: Optional[str] = ""

class CategorySchema(BaseModel):
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        populate_by_name=True,
        json_encoders={ObjectId: str}
    )

    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    count: int
