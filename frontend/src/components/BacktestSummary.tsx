import { BacktestResult } from '../utils/types';

interface BacktestSummaryProps {
  result: BacktestResult;
}

export function BacktestSummary({ result }: BacktestSummaryProps) {
  return (
    <section className="panel">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Backtest</p>
          <h2>Strategy results</h2>
        </div>
      </div>
      <div className="summary-grid">
        <SummaryMetric label="Total trades" value={String(result.totalTrades)} />
        <SummaryMetric label="Net profit" value={formatMoney(result.netProfit)} />
        <SummaryMetric label="Win rate" value={`${result.winRate.toFixed(2)}%`} />
        <SummaryMetric label="Max drawdown" value={`${result.maxDrawdown.toFixed(2)}%`} />
        <SummaryMetric label="Final equity" value={formatMoney(result.finalEquity)} />
      </div>
    </section>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatMoney(value: number) {
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });
}
