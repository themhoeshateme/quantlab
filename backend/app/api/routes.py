from typing import Annotated

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.models import BacktestRequest, BacktestResponse, Candle, IndicatorRequest
from app.services.backtester import run_ma_crossover_backtest
from app.services.data_loader import load_sample_candles, parse_upload_file
from app.services.indicators import bollinger_bands, ema, rsi, sma

router = APIRouter(prefix="/api")


@router.get("/sample-data", response_model=list[Candle])
def get_sample_data() -> list[Candle]:
    return load_sample_candles()


@router.post("/upload-csv", response_model=list[Candle])
async def upload_csv(file: Annotated[UploadFile, File()]) -> list[Candle]:
    try:
        return await parse_upload_file(file)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.post("/indicators")
def calculate_indicators(request: IndicatorRequest) -> dict[str, object]:
    closes = [candle.close for candle in request.candles]
    output: dict[str, object] = {}

    for period in request.indicators.sma:
        output[f"sma_{period}"] = sma(closes, period)
    for period in request.indicators.ema:
        output[f"ema_{period}"] = ema(closes, period)
    if request.indicators.rsi is not None:
        output[f"rsi_{request.indicators.rsi}"] = rsi(closes, request.indicators.rsi)
    if request.indicators.bollinger is not None:
        output[f"bollinger_{request.indicators.bollinger}"] = bollinger_bands(
            closes, request.indicators.bollinger
        )

    return output


@router.post("/backtest/ma-crossover", response_model=BacktestResponse)
def run_backtest(request: BacktestRequest) -> BacktestResponse:
    try:
        return run_ma_crossover_backtest(
            candles=request.candles,
            short_window=request.short_window,
            long_window=request.long_window,
            initial_cash=request.initial_cash,
            fee_rate=request.fee_rate,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
