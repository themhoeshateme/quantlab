# Good First Issues

These issues are designed for beginner contributors. Each task should be small, testable, and easy to review.

## 1. Add Tooltip Explanations for Indicators

Description: Add short tooltip text that explains SMA, EMA, RSI, and Bollinger Bands in the indicator panel.

Expected files to edit:

- `frontend/src/components/IndicatorPanel.tsx`
- `frontend/src/styles.css`

Acceptance criteria:

- Each indicator has a concise explanation.
- Tooltips are keyboard-accessible or visible through a simple accessible pattern.
- Layout remains responsive on mobile.

Suggested labels: `good first issue`, `feature`, `help wanted`

## 2. Add ATR Indicator

Description: Add a pure TypeScript Average True Range indicator function and display its latest value in the dashboard.

Expected files to edit:

- `frontend/src/indicators/index.ts`
- `frontend/src/components/IndicatorPanel.tsx`
- `frontend/src/App.tsx`
- `frontend/src/tests/indicators.test.ts`

Acceptance criteria:

- ATR calculation is implemented as a pure function.
- ATR has unit test coverage.
- Latest ATR value appears in the indicator panel.

Suggested labels: `good first issue`, `feature`

## 3. Improve Empty CSV Upload Error Message

Description: Improve the message shown when a contributor uploads an empty CSV file or a CSV with only headers.

Expected files to edit:

- `frontend/src/utils/csv.ts`
- `frontend/src/components/DataLoader.tsx`
- `frontend/src/tests/csv.test.ts`

Acceptance criteria:

- Empty and header-only CSV files produce clear messages.
- Existing valid CSV parsing still works.
- CSV parser tests cover the new behavior.

Suggested labels: `good first issue`, `bug`

## 4. Add Dark/Light Theme Toggle

Description: Add a simple theme toggle that switches between the current light theme and a dark theme.

Expected files to edit:

- `frontend/src/App.tsx`
- `frontend/src/styles.css`
- Optional: `frontend/src/components/ThemeToggle.tsx`

Acceptance criteria:

- Users can switch between light and dark themes.
- The selected theme applies to the dashboard, panels, chart area, and table.
- Text remains readable in both themes.

Suggested labels: `good first issue`, `feature`, `help wanted`

## 5. Add Documentation Example for OHLCV CSV Format

Description: Expand the README with a clearer CSV example and explain each required OHLCV column.

Expected files to edit:

- `README.md`

Acceptance criteria:

- README includes a valid CSV example.
- Each required column is briefly explained.
- No claims are made about unsupported data sources.

Suggested labels: `good first issue`, `documentation`
