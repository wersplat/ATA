export function formatStat(value, isPercentage = false) {
  if (value == null) return '-';
  if (isPercentage) return `${Number(value).toFixed(1)}%`;
  return Number(value).toFixed(1);
}

export function formatRecord(wins, losses) {
  return `${wins}-${losses}`;
}

export function formatRankChange(current, previous) {
  if (previous == null || current == null) return { text: '-', className: 'text-gray-400' };
  const diff = previous - current; // positive = moved up
  if (diff > 0) return { text: `↑${diff}`, className: 'text-green-500' };
  if (diff < 0) return { text: `↓${Math.abs(diff)}`, className: 'text-red-500' };
  return { text: '—', className: 'text-gray-400' };
}

export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
