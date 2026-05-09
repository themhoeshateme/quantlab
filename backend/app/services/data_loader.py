from pathlib import Path

from fastapi import UploadFile
from pydantic import ValidationError

from app.models import Candle

REQUIRED_COLUMNS = {"open", "high", "low", "close", "volume"}
TIME_COLUMNS = ("timestamp", "date")
SAMPLE_DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "sample_btc_usd.csv"


def load_sample_candles() -> list[Candle]:
    return parse_ohlcv_csv(SAMPLE_DATA_PATH.read_text(encoding="utf-8"))


async def parse_upload_file(file: UploadFile) -> list[Candle]:
    content = await file.read()
    if not content:
        raise ValueError("CSV file is empty.")
    try:
        text = content.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise ValueError("CSV file must be UTF-8 encoded.") from exc
    return parse_ohlcv_csv(text)


def parse_ohlcv_csv(csv_text: str) -> list[Candle]:
    lines = [line.strip() for line in csv_text.strip().splitlines() if line.strip()]
    if len(lines) < 2:
        raise ValueError("CSV must include a header row and at least one candle row.")

    headers = [header.strip().lower() for header in lines[0].split(",")]
    time_column = next((column for column in TIME_COLUMNS if column in headers), None)
    missing = sorted(REQUIRED_COLUMNS - set(headers))

    if time_column is None:
        missing.insert(0, "timestamp or date")
    if missing:
        raise ValueError(f"CSV is missing required columns: {', '.join(missing)}.")

    candles: list[Candle] = []
    for row_number, line in enumerate(lines[1:], start=2):
        cells = [cell.strip() for cell in line.split(",")]
        if len(cells) != len(headers):
            raise ValueError(
                f"Row {row_number} has {len(cells)} values but expected {len(headers)}."
            )

        row = dict(zip(headers, cells, strict=True))
        try:
            candles.append(
                Candle(
                    timestamp=row[time_column],
                    open=float(row["open"]),
                    high=float(row["high"]),
                    low=float(row["low"]),
                    close=float(row["close"]),
                    volume=float(row["volume"]),
                )
            )
        except (KeyError, TypeError, ValueError, ValidationError) as exc:
            raise ValueError(f"Row {row_number} contains invalid OHLCV data.") from exc

    return candles
