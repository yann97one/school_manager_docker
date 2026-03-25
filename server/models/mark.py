from sqlmodel import Field, SQLModel
from typing import Optional


class Mark(SQLModel, table=True):
    __tablename__ = "Marks"

    id: Optional[int] = Field(default=None, primary_key=True)
    teacher_id: Optional[int] = Field(default=None, foreign_key="Teachers.id")
    student_id: Optional[int] = Field(default=None, foreign_key="Students.id")
    value: Optional[float] = Field(default=None)
