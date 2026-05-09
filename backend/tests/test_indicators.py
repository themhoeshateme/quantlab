import pytest

from app.services.indicators import bollinger_bands, ema, rsi, sma


def test_sma_calculation() -> None:
    assert sma([10, 20, 30, 40], 3) == [None, None, 20, 30]


def test_ema_calculation() -> None:
    assert ema([10, 20, 30, 40], 3) == [None, None, 20, 30]


def test_rsi_calculation() -> None:
    values = [44, 45, 43, 46, 47, 45, 48]
    result = rsi(values, 3)

    assert result[:3] == [None, None, None]
    assert result[3] == 66.6667
    assert result[6] > 60


def test_bollinger_bands_calculation() -> None:
    result = bollinger_bands([1, 2, 3, 4, 5], 5, 2)

    assert result == {
        "upper": [None, None, None, None, 5.8284],
        "middle": [None, None, None, None, 3],
        "lower": [None, None, None, None, 0.1716],
    }


def test_indicator_rejects_invalid_period() -> None:
    with pytest.raises(ValueError, match="Period must be a positive integer."):
        sma([1, 2, 3], 0)
