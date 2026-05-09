import { describe, expect, it } from 'vitest';
import { parseOhlcvCsv } from '../utils/csv';

describe('parseOhlcvCsv', () => {
  it('parses valid OHLCV rows', () => {
    const candles = parseOhlcvCsv(`date,open,high,low,close,volume
2024-01-01,10,12,9,11,1000`);

    expect(candles).toEqual([
      {
        date: '2024-01-01',
        open: 10,
        high: 12,
        low: 9,
        close: 11,
        volume: 1000,
      },
    ]);
  });

  it('reports missing required columns', () => {
    expect(() => parseOhlcvCsv('date,open,close\n2024-01-01,10,11')).toThrow(
      'CSV is missing required columns: high, low, volume.',
    );
  });
});
