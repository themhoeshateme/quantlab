# QuantLab

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111827)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Binance API](https://img.shields.io/badge/Binance%20API-Klines-F0B90B?logo=binance&logoColor=111827)](https://developers.binance.com/)
[![Lightweight Charts](https://img.shields.io/badge/Lightweight%20Charts-5-2962FF)](https://tradingview.github.io/lightweight-charts/)
[![Tests](https://img.shields.io/badge/tests-passing-16a34a)](#testing)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

QuantLab is an open-source GUI-based quantitative backtesting foundation for OHLCV market data, technical indicators, simple strategies, and beginner-friendly contribution.

This repository is intentionally scoped as an initial MVP for contributors. Does not include authentication, databases, brokerage integrations, payments, AI agents, or live trading execution.

## Features

- Dark React + Vite + TypeScript trading-terminal frontend
- Python + FastAPI backend
- Bundled sample BTC-USD OHLCV data
- CSV upload and OHLCV validation
- Technical indicators:
  - SMA
  - EMA
  - RSI
  - Bollinger Bands
- Moving average crossover backtest
- Backtest summary, signals, equity curve, and trade log
- Frontend fallback calculations if the backend is not running
- Frontend and backend tests
- GitHub Actions CI for frontend and backend checks
- Open-source contribution docs, issue templates, PR template, labels, and license

## Tech Stack

Frontend:

- React
- Vite
- TypeScript
- Plain CSS
- Vitest
- ESLint
- Prettier

Backend:

- Python 3.11+
- FastAPI
- Uvicorn
- Pydantic
- Pytest
- HTTPX
- Ruff

## Screenshots

Current UI screenshots are documented in `docs/FRONTEND.md` and stored under `docs/screenshots/`:

- `docs/screenshots/terminal-dashboard.png`
- `docs/screenshots/backtest-history.png`

![QuantLab terminal dashboard](docs/screenshots/terminal-dashboard.png)

## Frontend Setup

Prerequisites:

- Node.js 20 or newer
- npm 10 or newer

Install dependencies:

```bash
cd frontend
npm install
```

Create a local environment file if you want to point the frontend to the backend:

```bash
cd frontend
cp .env.example .env
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`.

## Backend Setup

Prerequisites:

- Python 3.11 or newer

macOS/Linux:

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

The backend runs at `http://localhost:8000`. The frontend reads `VITE_API_URL`, which defaults to `http://localhost:8000`.

## API Endpoints

- `GET /health` returns backend service status.
- `GET /api/sample-data` returns bundled OHLCV candles.
- `POST /api/upload-csv` validates and normalizes OHLCV CSV uploads.
- `POST /api/indicators` calculates SMA, EMA, RSI, and Bollinger Bands.
- `POST /api/backtest/ma-crossover` runs the moving-average crossover backtest.

## Testing and Checks

Frontend:

```bash
cd frontend
npm run lint
npm run format:check
npm test
npm run build
```

Backend:

```bash
cd backend
ruff check .
ruff format --check .
pytest
```

## CSV Format

CSV uploads must include `timestamp` or `date`, plus these numeric columns:

```csv
timestamp,open,high,low,close,volume
2024-01-01,100,105,98,103,150000
```

## How to Contribute

1. Fork the repository.
2. Create a branch using the naming convention in `CONTRIBUTING.md`.
3. Make a small, focused change.
4. Run the relevant frontend and backend checks.
5. Open a pull request using the pull request template.

Beginner-friendly tasks are listed in `docs/GOOD_FIRST_ISSUES.md`.

## Repository Labels

The starter labels are defined in `.github/labels.yml`:

- `good first issue`
- `bug`
- `feature`
- `help wanted`
- `documentation`

If the GitHub CLI is installed and authenticated, maintainers can apply or update the labels with:

```bash
bash scripts/setup-labels.sh
```

Without GitHub CLI, create the labels manually in the GitHub repository settings using `.github/labels.yml` as the source of truth.

## Known Limitations

- No live trading or brokerage execution.
- No authentication or user accounts.
- No database or persisted backtest history.
- Sharpe ratio is intentionally shown as not implemented.
- The chart is a lightweight SVG visualization, not a full charting engine.

## Repository Structure

```text
frontend/   React + Vite + TypeScript terminal UI
backend/    Python + FastAPI validation, indicators, and backtesting API
docs/       Contributor docs, good first issues, and screenshots
.github/    Issue templates, PR template, labels, and CI
```

## Roadmap

- Add more indicators such as ATR and MACD.
- Improve CSV validation and documentation examples.
- Add more strategy examples.
- Add persisted backtest history when a database is introduced.
- Add demo GIFs and refresh screenshots as the UI evolves.
- Improve accessibility and keyboard navigation.

## Contact

Maintainer contact channel: add a GitHub Discussions link or community chat link before public program onboarding.

## License

MIT License. See `LICENSE`.
