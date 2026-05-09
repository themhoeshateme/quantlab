import { Trade } from '../utils/types';

interface TradeLogProps {
  trades: Trade[];
}

export function TradeLog({ trades }: TradeLogProps) {
  return (
    <section className="panel table-panel">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Signals</p>
          <h2>Trade log</h2>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Entry</th>
              <th>Exit</th>
              <th>Entry price</th>
              <th>Exit price</th>
              <th>Profit</th>
              <th>Return</th>
            </tr>
          </thead>
          <tbody>
            {trades.length === 0 ? (
              <tr>
                <td colSpan={6}>No completed crossover trades for this dataset.</td>
              </tr>
            ) : (
              trades.map((trade) => (
                <tr key={`${trade.entryDate}-${trade.exitDate}`}>
                  <td>{trade.entryDate}</td>
                  <td>{trade.exitDate}</td>
                  <td>{formatMoney(trade.entryPrice)}</td>
                  <td>{formatMoney(trade.exitPrice)}</td>
                  <td className={trade.profit >= 0 ? 'positive' : 'negative'}>
                    {formatMoney(trade.profit)}
                  </td>
                  <td>{trade.returnPct.toFixed(2)}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatMoney(value: number) {
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });
}
