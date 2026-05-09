from __future__ import annotations

import json
from datetime import UTC, date, datetime, timedelta
from urllib.parse import urlencode
from urllib.request import urlopen

BINANCE_KLINES_URL = "https://api.binance.com/api/v3/klines"
MAX_KLINES_PER_REQUEST = 1000

INTERVAL_TO_MS = {
    "1m": 60_000,
    "3m": 180_000,
    "5m": 300_000,
    "15m": 900_000,
    "30m": 1_800_000,
    "1h": 3_600_000,
    "2h": 7_200_000,
    "4h": 14_400_000,
    "6h": 21_600_000,
    "8h": 28_800_000,
    "12h": 43_200_000,
    "1d": 86_400_000,
    "3d": 259_200_000,
    "1w": 604_800_000,
    "1M": 2_592_000_000,
}


def fetch_klines(
    symbol: str,
    interval: str,
    start_date: date,
    end_date: date,
) -> list[dict[str, object]]:
    if interval not in INTERVAL_TO_MS:
        raise ValueError(f"Unsupported interval '{interval}'.")
    if end_date < start_date:
        raise ValueError("end_date must be greater than or equal to start_date.")

    start_dt = datetime.combine(start_date, datetime.min.time(), tzinfo=UTC)
    end_dt_exclusive = datetime.combine(
        end_date + timedelta(days=1),
        datetime.min.time(),
        tzinfo=UTC,
    )
    start_ms = int(start_dt.timestamp() * 1000)
    end_ms_exclusive = int(end_dt_exclusive.timestamp() * 1000)
    step_ms = INTERVAL_TO_MS[interval]

    normalized: list[dict[str, object]] = []
    cursor_ms = start_ms

    while cursor_ms < end_ms_exclusive:
        params = {
            "symbol": symbol.upper(),
            "interval": interval,
            "startTime": cursor_ms,
            "endTime": end_ms_exclusive - 1,
            "limit": MAX_KLINES_PER_REQUEST,
        }
        url = f"{BINANCE_KLINES_URL}?{urlencode(params)}"
        with urlopen(url, timeout=20) as response:
            payload = json.loads(response.read().decode("utf-8"))

        if not payload:
            break

        for candle in payload:
            open_time_ms = int(candle[0])
            normalized.append(
                {
                    "time": open_time_ms // 1000,
                    "open": float(candle[1]),
                    "high": float(candle[2]),
                    "low": float(candle[3]),
                    "close": float(candle[4]),
                    "volume": float(candle[5]),
                }
            )

        last_open_ms = int(payload[-1][0])
        next_cursor_ms = last_open_ms + step_ms
        if next_cursor_ms <= cursor_ms:
            break
        cursor_ms = next_cursor_ms

    return normalized
