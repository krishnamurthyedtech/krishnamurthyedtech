from sqlalchemy import Column, Integer, String, Text, DateTime, Table
from sqlalchemy.sql import func
from database import Base


class ContactMessage(Base):
    __table__ = Table(
        "kmedtech_conInfo",
        Base.metadata,
        Column("id", Integer, primary_key=True, index=True),
        Column("name", String(150), nullable=False),
        Column("email", String(254), nullable=False, index=True),
        Column("subject", String(200), nullable=False),
        Column("message", Text, nullable=False),
        Column("created_at", DateTime(timezone=True), server_default=func.now(), nullable=False),
        schema="kmedtech_schema",
        quote=True,
    )


class Service(Base):
    __tablename__ = "services"
    __table_args__ = {"schema": "kmedtech_schema"}

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)


class Product(Base):
    __tablename__ = "products"
    __table_args__ = {"schema": "kmedtech_schema"}

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
