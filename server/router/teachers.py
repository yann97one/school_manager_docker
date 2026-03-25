from fastapi import APIRouter, HTTPException
from sqlmodel import select
from models import Teacher
from database import SessionDep

router = APIRouter(prefix="/teachers", tags=["Teachers"])


@router.get("/")
def get_teachers(session: SessionDep):
    return session.exec(select(Teacher)).all()


@router.get("/{teacher_id}")
def get_teacher(teacher_id: int, session: SessionDep):
    teacher = session.get(Teacher, teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher


@router.post("/")
def create_teacher(teacher: Teacher, session: SessionDep):
    session.add(teacher)
    session.commit()
    session.refresh(teacher)
    return teacher


@router.put("/{teacher_id}")
def update_teacher(teacher_id: int, updated: Teacher, session: SessionDep):
    teacher = session.get(Teacher, teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    for key, value in updated.model_dump(exclude_unset=True).items():
        setattr(teacher, key, value)
    session.commit()
    session.refresh(teacher)
    return teacher


@router.delete("/{teacher_id}")
def delete_teacher(teacher_id: int, session: SessionDep):
    teacher = session.get(Teacher, teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    session.delete(teacher)
    session.commit()
    return {"message": "Teacher deleted"}
