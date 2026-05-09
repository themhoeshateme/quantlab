# QuantLab API

FastAPI backend foundation for QuantLab. It validates OHLCV data, calculates technical indicators, and runs a simple moving-average crossover backtest.

Does not include authentication, live trading, brokerage APIs, databases, payments, or AI agents.

## Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

Windows PowerShell:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000` by default.

## Endpoints

- `GET /health`
- `GET /api/sample-data`
- `POST /api/upload-csv`
- `POST /api/indicators`
- `POST /api/backtest/ma-crossover`

## Checks

```bash
ruff check .
ruff format --check .
pytest
```

## Contributor Notes

- Keep indicator and backtest logic in `app/services`.
- Keep API routes thin.
- Add tests for new indicators, strategies, and validation behavior.
- Use typed Pydantic models for request and response schemas.
