from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas

router = APIRouter(prefix="/api/services", tags=["services"])


@router.get("/", response_model=list[schemas.ServiceRead])
def get_services(db: Session = Depends(get_db)):
    services = db.query(models.Service).all()
    if services is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No services found")
    return services
