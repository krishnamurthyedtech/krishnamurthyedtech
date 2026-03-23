from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("/", response_model=schemas.ContactRead, status_code=status.HTTP_201_CREATED)
def create_contact(payload: schemas.ContactCreate, db: Session = Depends(get_db)):
    try:
        contact = models.ContactMessage(
            name=payload.name,
            email=payload.email,
            subject=payload.subject,
            message=payload.message,
        )
        db.add(contact)
        db.commit()
        db.refresh(contact)
        return contact
    except Exception as ex:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(ex))


@router.get("/", response_model=list[schemas.ContactRead])
def read_contacts(db: Session = Depends(get_db)):
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()
