interface IndicatorPanelProps {
  latest: {
    smaShort: number | null;
    smaLong: number | null;
    ema: number | null;
    rsi: number | null;
    upperBand: number | null;
    lowerBand: number | null;
  };
}

export function IndicatorPanel({ latest }: IndicatorPanelProps) {
  return (
    <section className="panel">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Indicators</p>
          <h2>Latest values</h2>
        </div>
      </div>
      <div className="metric-list">
        <Metric label="SMA 5" value={formatNumber(latest.smaShort)} />
        <Metric label="SMA 12" value={formatNumber(latest.smaLong)} />
        <Metric label="EMA 10" value={formatNumber(latest.ema)} />
        <Metric label="RSI 14" value={formatNumber(latest.rsi)} />
        <Metric label="Bollinger upper" value={formatNumber(latest.upperBand)} />
        <Metric label="Bollinger lower" value={formatNumber(latest.lowerBand)} />
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatNumber(value: number | null): string {
  return value === null ? 'Pending' : value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}
