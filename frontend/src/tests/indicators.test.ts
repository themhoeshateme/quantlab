import { describe, expect, it } from 'vitest';
import { calculateBollingerBands, calculateEma, calculateRsi, calculateSma } from '../indicators';

describe('indicator calculations', () => {
  it('calculates SMA with nulls until the period is available', () => {
    expect(calculateSma([10, 20, 30, 40], 3)).toEqual([null, null, 20, 30]);
  });

  it('calculates EMA seeded by the first SMA window', () => {
    expect(calculateEma([10, 20, 30, 40], 3)).toEqual([null, null, 20, 30]);
  });

  it('calculates RSI for a mixed price series', () => {
    const rsi = calculateRsi([44, 45, 43, 46, 47, 45, 48], 3);

    expect(rsi.slice(0, 3)).toEqual([null, null, null]);
    expect(rsi[3]).toBe(66.6667);
    expect(rsi[6]).toBeGreaterThan(60);
  });

  it('calculates Bollinger Bands with population standard deviation', () => {
    expect(calculateBollingerBands([1, 2, 3, 4, 5], 5, 2)).toEqual([
      null,
      null,
      null,
      null,
      { middle: 3, upper: 5.8284, lower: 0.1716 },
    ]);
  });

  it('rejects invalid periods', () => {
    expect(() => calculateSma([1, 2, 3], 0)).toThrow('Period must be a positive integer.');
  });
});
