from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models
import schemas

router = APIRouter(prefix="/api/products", tags=["products"])


@router.get("/", response_model=list[schemas.ProductRead])
def get_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).all()
    if products is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No products found")
    return products
