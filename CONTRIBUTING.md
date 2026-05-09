# Contributing to QuantLab

Thanks for helping improve QuantLab. This project is designed to be beginner-friendly while keeping code quality high.

## Pull Request Format

Use the pull request template and include:

- What changed
- Why it changed
- How it was tested
- Screenshots or screen recordings for UI changes, when useful

Keep pull requests small and focused. A good pull request should solve one clear issue.

## Commit Message Convention

Use short, descriptive commit messages:

```text
feat: add atr indicator
fix: improve csv upload error message
docs: add ohlcv csv example
test: cover moving average crossover
chore: update ci workflow
```

Recommended prefixes:

- `feat`
- `fix`
- `docs`
- `test`
- `refactor`
- `chore`

## Branch Naming Convention

Use lowercase words separated by hyphens:

```text
feature/add-atr-indicator
fix/csv-empty-error
docs/ohlcv-example
test/backtest-results
```

## Test Expectations

Before opening a pull request, run:

```bash
cd frontend
npm run lint
npm run format:check
npm test
npm run build
```

For backend changes, also run:

```bash
cd backend
ruff check .
ruff format --check .
pytest
```

Indicator and backtest logic should include tests. UI-only changes should include tests when behavior changes.

## Code Style

- Use TypeScript for frontend app logic in `frontend/src`.
- Keep indicator and backtest functions pure where possible.
- Avoid hardcoded fake metrics in the UI.
- Prefer small components and clear names.
- Run Prettier before committing.

## Backend Contribution Rules

- Keep business logic outside API routes. Put indicators, data loading, and strategy logic in `backend/app/services`.
- Add tests for every new indicator.
- Add tests for every new strategy or backtest behavior.
- Document new endpoints in `README.md` and `backend/README.md`.
- Use typed Pydantic models for request and response schemas.
- Return JSON-safe values only. Convert missing indicator values to `null`.
- Do not add authentication, databases, live trading, brokerage integrations, secrets, or background infrastructure unless maintainers explicitly scope that work.

## Review Timeline

Maintainers will try to review pull requests within 3 to 7 days. During busy program periods, reviews may take longer.

## Contributor Behavior

Be respectful, constructive, and patient. Ask questions early if an issue is unclear. Do not include private keys, tokens, personal information, or unrelated generated files in pull requests.
