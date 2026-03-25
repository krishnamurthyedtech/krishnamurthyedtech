import logging
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

import models
from database import engine, Base, get_db
from routers import contact, services, products

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("kmedtech_backend")

app = FastAPI(
    title="KMedTech API",
    version="1.0.0",
    description="Production-ready backend for KMedTech React website",
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router)
app.include_router(services.router)
app.include_router(products.router)


@app.on_event("startup")
def startup_event():
    logger.info("Creating schema and database tables and seeding if needed")

    # create schema if missing
    with engine.begin() as conn:
        conn.execute(text("CREATE SCHEMA IF NOT EXISTS kmedtech_schema"))

    Base.metadata.create_all(bind=engine)

    # Seed static service & product data if empty
    from sqlalchemy.orm import Session
    db = Session(bind=engine)
    try:
        service_count = db.query(models.Service).count()
        product_count = db.query(models.Product).count()

        if service_count == 0:
            logger.info("Seeding service entries")
            db.add_all([
                models.Service(title="Staff Augmentation", description="Grow your team with senior engineers."),
                models.Service(title="Engineering Operations", description="Improve delivery with process engineering."),
                models.Service(title="Technical Screening", description="Assess candidate skills with custom tests."),
            ])

        if product_count == 0:
            logger.info("Seeding product entries")
            db.add_all([
                models.Product(title="Fullstack Development", description="React + Node + AWS solutions."),
                models.Product(title="Mobile Apps", description="iOS/Android with React Native."),
            ])

        db.commit()
    except Exception as ex:
        db.rollback()
        logger.exception("Failed to seed database: %s", ex)
        raise
    finally:
        db.close()


@app.get("/api/status")
def read_status():
    return {"status": "ok", "app": "kmedtech"}


@app.get("/")
def root():
    return {"message": "Welcome to KMedTech API", "version": "1.0.0", "docs": "/docs"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
