from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_sample_data_endpoint() -> None:
    response = client.get("/api/sample-data")

    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 20
    assert {"timestamp", "open", "high", "low", "close", "volume"} <= set(data[0])


def test_indicators_endpoint() -> None:
    candles = client.get("/api/sample-data").json()
    response = client.post(
        "/api/indicators",
        json={
            "candles": candles,
            "indicators": {"sma": [5, 12], "ema": [10], "rsi": 14, "bollinger": 20},
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert "sma_5" in data
    assert "ema_10" in data
    assert "rsi_14" in data
    assert "bollinger_20" in data
    assert len(data["sma_5"]) == len(candles)


def test_backtest_endpoint() -> None:
    candles = client.get("/api/sample-data").json()
    response = client.post(
        "/api/backtest/ma-crossover",
        json={
            "candles": candles,
            "short_window": 5,
            "long_window": 12,
            "initial_cash": 10000,
            "fee_rate": 0.001,
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert {"summary", "trades", "signals", "equity_curve"} <= set(data)
    assert "final_equity" in data["summary"]


def test_invalid_csv_upload_returns_clear_400() -> None:
    response = client.post(
        "/api/upload-csv",
        files={"file": ("bad.csv", "timestamp,open,close\n2024-01-01,10,11", "text/csv")},
    )

    assert response.status_code == 400
    assert "CSV is missing required columns" in response.json()["detail"]
