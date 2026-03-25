from fastapi import APIRouter, HTTPException
from sqlmodel import select
from models import Mark
from database import SessionDep

router = APIRouter(prefix="/marks", tags=["Marks"])


@router.get("/")
def get_marks(session: SessionDep):
    return session.exec(select(Mark)).all()


@router.get("/{mark_id}")
def get_mark(mark_id: int, session: SessionDep):
    mark = session.get(Mark, mark_id)
    if not mark:
        raise HTTPException(status_code=404, detail="Mark not found")
    return mark


@router.get("/student/{student_id}")
def get_marks_by_student(student_id: int, session: SessionDep):
    marks = session.exec(select(Mark).where(Mark.student_id == student_id)).all()
    return marks


@router.post("/")
def create_mark(mark: Mark, session: SessionDep):
    session.add(mark)
    session.commit()
    session.refresh(mark)
    return mark


@router.put("/{mark_id}")
def update_mark(mark_id: int, updated: Mark, session: SessionDep):
    mark = session.get(Mark, mark_id)
    if not mark:
        raise HTTPException(status_code=404, detail="Mark not found")
    for key, value in updated.model_dump(exclude_unset=True).items():
        setattr(mark, key, value)
    session.commit()
    session.refresh(mark)
    return mark


@router.delete("/{mark_id}")
def delete_mark(mark_id: int, session: SessionDep):
    mark = session.get(Mark, mark_id)
    if not mark:
        raise HTTPException(status_code=404, detail="Mark not found")
    session.delete(mark)
    session.commit()
    return {"message": "Mark deleted"}
