# QuantNova Work Progress

## 2026-05-09 - TradingView-style OHLCV chart improvements

Implemented with minimal scoped changes:

- OHLCV CSV/XLSX files now render as interactive `lightweight-charts` price charts.
- Chart type toggle added:
  - Candlestick
  - Bar
- Buy/sell signals are plotted directly on the chart using real backend backtest signals.
- Backtest response now returns signal objects with:
  - `time`
  - `type`
  - `price`
  - `reason`
- Backtest response also includes `stats` and time-based `equity_curve` points.
- Short SMA and long SMA overlays remain available.
- Added chart toggles for signals, SMA, and volume.
- Added OHLCV hover readout for the current candle.
- README badges added for React, TypeScript, Vite, FastAPI, Python, Binance API, Lightweight Charts, tests, and license.
- Final ship pass completed:
  - Backend API tests: `python -m pytest -q` from `backend` -> 15 passed.
  - Frontend production build: `npm.cmd run build` from `frontend` -> TypeScript and Vite build passed.
  - Prepared for GitHub commit/push with the Binance data flow, file upload flow, chart UI, backtest stats, tests, and README updates included.
- CI repair pass completed:
  - Frontend Prettier check fixed for the chart/UI files.
  - Backend Ruff lint/format issues fixed for Binance/data-loader/backtester code.
  - App tests updated for the new generic upload endpoint and chart-library test mocking.
  - Full local CI-equivalent checks passed before pushing the fix.

Support/resistance zone note:

- TODO: add a translucent support/resistance zone overlay with a chart primitive or plugin. This was deferred to keep the current pass scoped and avoid breaking chart rendering.

Screenshot captures:

- `docs/screenshots/ohlcv-candlestick-signals.png`
- `docs/screenshots/terminal-dashboard.png`
- `docs/screenshots/backtest-history.png`

## 2026-05-09 - Backtesting and Data Features

Implemented with minimal scoped changes:

- Added backend Binance candles endpoint:
  - `GET /market/binance/klines?symbol=BTCUSDT&interval=15m&start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`
  - Uses Binance public `GET /api/v3/klines`
  - Fetches in chunks (`limit=1000`) until the requested date range is completed
  - Normalizes output candles as:
    - `time`, `open`, `high`, `low`, `close`, `volume`
- Added backend upload endpoint:
  - `POST /api/data/upload` via multipart/form-data
  - Accepts only `.csv` and `.xlsx`
  - Parses with `pandas.read_csv` and `pandas.read_excel`
  - Validates required OHLCV columns (`timestamp/date/time`, `open`, `high`, `low`, `close`, `volume`)
  - Returns clear missing-column errors
- Frontend:
  - Upload now supports `.csv` and `.xlsx`
  - Added backtest start/end date controls (date filter for chart/indicators/backtest run)
  - Added Binance fetch controls (symbol, interval, start date, end date)
  - Replaced custom SVG candlestick renderer with `lightweight-charts`
  - Added chart controls: Zoom In, Zoom Out, Reset View

## Screenshot Notes

- Reuse existing terminal layout screenshots in `docs/screenshots/` as baseline style references.
- Capture updated terminal/backtest views after running local backend/frontend with:
  - Binance controls visible
  - Date range inputs visible
  - New chart controls visible
