from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from .models import ContactRequest, ContactResponse, FeatureItem

app = FastAPI(
    title="KMedTech API",
    description="Backend API for KMedTech front-end website",
    version="0.1.0",
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

services = [
    FeatureItem(id=1, title="Staff Augmentation", description="Grow your team with senior engineers.") ,
    FeatureItem(id=2, title="Engineering Operations", description="Improve delivery with process engineering."),
    FeatureItem(id=3, title="Technical Screening", description="Assess candidate skills with custom tests."),
]

products = [
    FeatureItem(id=1, title="Fullstack Development", description="React + Node + AWS solutions."),
    FeatureItem(id=2, title="Mobile Apps", description="iOS/Android with React Native."),
]

@app.get("/api/services", response_model=list[FeatureItem])
def get_services():
    return services


@app.get("/api/products", response_model=list[FeatureItem])
def get_products():
    return products


@app.post("/api/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def submit_contact(request: ContactRequest):
    # TODO: Add persistence (DB, email, CRM, etc.)
    # For PoC we just echo.
    return ContactResponse(status="received", detail="Thanks, we'll be in touch soon.")


@app.get("/api/status")
def status_check():
    return {"status": "ok", "app": "kmedtech"}
