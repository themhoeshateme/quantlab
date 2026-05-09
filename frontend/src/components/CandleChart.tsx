import { Trade } from '../utils/types';
import { Candle } from '../utils/types';

interface CandleChartProps {
  candles: Candle[];
  shortSma: Array<number | null>;
  longSma: Array<number | null>;
  trades: Trade[];
  showShortSma?: boolean;
  showLongSma?: boolean;
}

const WIDTH = 920;
const HEIGHT = 470;
const PADDING = 34;

export function CandleChart({
  candles,
  shortSma,
  longSma,
  trades,
  showShortSma = true,
  showLongSma = true,
}: CandleChartProps) {
  if (candles.length === 0) {
    return <div className="empty-chart">Load OHLCV data to render a chart.</div>;
  }

  const prices = candles.flatMap((candle) => [candle.high, candle.low]);
  const max = Math.max(...prices);
  const min = Math.min(...prices);
  const xStep = (WIDTH - PADDING * 2) / Math.max(candles.length - 1, 1);
  const candleWidth = Math.max(5, Math.min(18, xStep * 0.55));

  const xForIndex = (index: number) => PADDING + index * xStep;
  const yForPrice = (price: number) => {
    const range = max - min || 1;
    return HEIGHT - PADDING - ((price - min) / range) * (HEIGHT - PADDING * 2);
  };

  const shortPath = linePath(shortSma, xForIndex, yForPrice);
  const longPath = linePath(longSma, xForIndex, yForPrice);
  const entryDates = new Set(trades.map((trade) => trade.entryDate));
  const exitDates = new Set(trades.map((trade) => trade.exitDate));
  const latestClose = candles[candles.length - 1].close;
  const latestY = yForPrice(latestClose);
  const latestX = xForIndex(candles.length - 1);

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="OHLCV candle chart">
        <defs>
          <linearGradient id="chartGlow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#a5a2ff" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect width={WIDTH} height={HEIGHT} rx="8" className="chart-bg" />
        <rect
          x={PADDING}
          y={PADDING}
          width={WIDTH - PADDING * 2}
          height={HEIGHT - PADDING * 2}
          className="chart-glow"
        />
        {[0, 1, 2, 3, 4].map((tick) => {
          const y = PADDING + tick * ((HEIGHT - PADDING * 2) / 4);
          const price = max - tick * ((max - min) / 4);
          return (
            <g key={tick}>
              <line x1={PADDING} x2={WIDTH - PADDING} y1={y} y2={y} className="grid" />
              <text x={WIDTH - PADDING + 7} y={y + 4} className="axis-label">
                {price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </text>
            </g>
          );
        })}
        {[0, 1, 2, 3, 4, 5].map((tick) => {
          const x = PADDING + tick * ((WIDTH - PADDING * 2) / 5);
          return (
            <line
              key={tick}
              x1={x}
              x2={x}
              y1={PADDING}
              y2={HEIGHT - PADDING}
              className="grid vertical"
            />
          );
        })}

        {candles.map((candle, index) => {
          const x = xForIndex(index);
          const openY = yForPrice(candle.open);
          const closeY = yForPrice(candle.close);
          const highY = yForPrice(candle.high);
          const lowY = yForPrice(candle.low);
          const isUp = candle.close >= candle.open;
          const hasEntry = entryDates.has(candle.date);
          const hasExit = exitDates.has(candle.date);

          return (
            <g key={candle.date}>
              <line x1={x} x2={x} y1={highY} y2={lowY} className={isUp ? 'wick up' : 'wick down'} />
              <rect
                x={x - candleWidth / 2}
                y={Math.min(openY, closeY)}
                width={candleWidth}
                height={Math.max(Math.abs(closeY - openY), 2)}
                className={isUp ? 'candle up' : 'candle down'}
              />
              {hasEntry ? <circle cx={x} cy={lowY + 12} r="5" className="buy-marker" /> : null}
              {hasExit ? <circle cx={x} cy={highY - 12} r="5" className="sell-marker" /> : null}
            </g>
          );
        })}

        {showShortSma && shortPath ? <path d={shortPath} className="sma short" /> : null}
        {showLongSma && longPath ? <path d={longPath} className="sma long" /> : null}
        <line
          x1={PADDING}
          x2={WIDTH - PADDING}
          y1={latestY}
          y2={latestY}
          className="last-price-line"
        />
        <line
          x1={latestX}
          x2={latestX}
          y1={PADDING}
          y2={HEIGHT - PADDING}
          className="cursor-line"
        />
        <text x={WIDTH - PADDING - 76} y={latestY - 8} className="last-price-label">
          {latestClose.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </text>
      </svg>
      <div className="legend">
        {showShortSma ? (
          <span>
            <i className="legend-line short-line" /> Short SMA
          </span>
        ) : null}
        {showLongSma ? (
          <span>
            <i className="legend-line long-line" /> Long SMA
          </span>
        ) : null}
        <span>
          <i className="legend-dot buy" /> Buy
        </span>
        <span>
          <i className="legend-dot sell" /> Sell
        </span>
      </div>
    </div>
  );
}

function linePath(
  values: Array<number | null>,
  xForIndex: (index: number) => number,
  yForPrice: (price: number) => number,
) {
  return values
    .map((value, index) =>
      value === null ? null : `${index === 0 ? 'M' : 'L'} ${xForIndex(index)} ${yForPrice(value)}`,
    )
    .filter(Boolean)
    .join(' ')
    .replace(/^L/, 'M');
}
