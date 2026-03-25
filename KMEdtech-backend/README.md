# KMedTech Backend (FastAPI)

## Setup

1. Create virtual environment

```bash
python -m venv .venv
source .venv/bin/activate  # macOS / Linux
.venv\\Scripts\\activate   # Windows
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Run server

```bash
uvicorn backend.app:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

- `GET /api/status`
- `GET /api/services`
- `GET /api/products`
- `POST /api/contact` (payload: `name`, `email`, `subject`, `message`)

## Notes

- `backend/app.py` uses in-memory lists. Replace with DB and mail service for production.
- CORS allows local Vite (`localhost:5173`). Add production origins when deploying.
