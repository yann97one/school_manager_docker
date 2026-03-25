from sqlmodel import Field, SQLModel
from sqlalchemy import Column, String
from typing import Optional


class Teacher(SQLModel, table=True):
    __tablename__ = "Teachers"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: Optional[str] = Field(default=None)
    lastname: Optional[str] = Field(default=None)
    subject: Optional[str] = Field(default=None)
    email: Optional[str] = Field(default=None)
    clazz: Optional[str] = Field(default=None, sa_column=Column("class", String))
    student_id: Optional[int] = Field(default=None, foreign_key="Students.id")
