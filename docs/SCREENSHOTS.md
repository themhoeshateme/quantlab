# Screenshot Guide

Screenshots in this repository are real captures of the local app and should be refreshed when the UI changes materially.

## Current Screenshots

- `docs/screenshots/terminal-dashboard.png`
- `docs/screenshots/ohlcv-candlestick-signals.png`
- `docs/screenshots/backtest-history.png`

## Refresh Steps

1. Start the backend:

```bash
cd backend
uvicorn app.main:app --reload
```

2. Start the frontend:

```bash
cd frontend
npm run dev
```

3. Capture the terminal dashboard, OHLCV chart, and history/backtest views from `http://127.0.0.1:5173/`.

Current captures were refreshed on 2026-05-09 from the local app with the Binance candle controls and `lightweight-charts` chart visible.

Do not add edited mockups as screenshots. If a visual is conceptual, label it as a mockup instead.
