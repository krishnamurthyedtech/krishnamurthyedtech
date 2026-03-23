from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=150)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1)


class ContactRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True


class ServiceRead(BaseModel):
    id: int
    title: str
    description: str

    class Config:
        from_attributes = True


class ProductRead(BaseModel):
    id: int
    title: str
    description: str

    class Config:
        from_attributes = True
