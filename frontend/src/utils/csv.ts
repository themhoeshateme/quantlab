import { Candle } from './types';

const REQUIRED_COLUMNS = ['date', 'open', 'high', 'low', 'close', 'volume'];

export function parseOhlcvCsv(csv: string): Candle[] {
  const lines = csv
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error('CSV must include a header row and at least one candle row.');
  }

  const headers = lines[0].split(',').map((header) => header.trim().toLowerCase());
  const missing = REQUIRED_COLUMNS.filter((column) => !headers.includes(column));

  if (missing.length > 0) {
    throw new Error(`CSV is missing required columns: ${missing.join(', ')}.`);
  }

  return lines.slice(1).map((line, rowIndex) => {
    const cells = line.split(',').map((cell) => cell.trim());
    const row = Object.fromEntries(headers.map((header, index) => [header, cells[index]]));
    const candle = {
      date: row.date,
      open: toNumber(row.open, rowIndex, 'open'),
      high: toNumber(row.high, rowIndex, 'high'),
      low: toNumber(row.low, rowIndex, 'low'),
      close: toNumber(row.close, rowIndex, 'close'),
      volume: toNumber(row.volume, rowIndex, 'volume'),
    };

    if (!candle.date) {
      throw new Error(`Row ${rowIndex + 2} is missing a date.`);
    }

    return candle;
  });
}

function toNumber(value: string | undefined, rowIndex: number, column: string): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Row ${rowIndex + 2} has an invalid ${column} value.`);
  }

  return parsed;
}
