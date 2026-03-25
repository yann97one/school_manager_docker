from fastapi import APIRouter, HTTPException
from sqlmodel import select, Session
from models import Student
from database import SessionDep

router = APIRouter(prefix="/students", tags=["Students"])


@router.get("/")
def get_students(session: SessionDep):
    students = session.exec(select(Student)).all()
    return students


@router.get("/{student_id}")
def get_student(student_id: int, session: SessionDep):
    student = session.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student


@router.post("/")
def create_student(student: Student, session: SessionDep):
    session.add(student)
    session.commit()
    session.refresh(student)
    return student


@router.put("/{student_id}")
def update_student(student_id: int, updated: Student, session: SessionDep):
    student = session.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    for key, value in updated.model_dump(exclude_unset=True).items():
        setattr(student, key, value)
    session.commit()
    session.refresh(student)
    return student


@router.delete("/{student_id}")
def delete_student(student_id: int, session: SessionDep):
    student = session.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    session.delete(student)
    session.commit()
    return {"message": "Student deleted"}
