export const STAT_CATEGORIES = [
  { key: 'ppg', label: 'Points', abbr: 'PTS', perGame: true, totalKey: 'points' },
  { key: 'rpg', label: 'Rebounds', abbr: 'REB', perGame: true, totalKey: 'rebounds' },
  { key: 'apg', label: 'Assists', abbr: 'AST', perGame: true, totalKey: 'assists' },
  { key: 'spg', label: 'Steals', abbr: 'STL', perGame: true, totalKey: 'steals' },
  { key: 'bpg', label: 'Blocks', abbr: 'BLK', perGame: true, totalKey: 'blocks' },
  { key: 'fgPct', label: 'Field Goal %', abbr: 'FG%', perGame: false },
  { key: 'threePct', label: '3-Point %', abbr: '3P%', perGame: false },
  { key: 'ftPct', label: 'Free Throw %', abbr: 'FT%', perGame: false },
  { key: 'mpg', label: 'Minutes', abbr: 'MIN', perGame: true, totalKey: 'minutes' },
  { key: 'topg', label: 'Turnovers', abbr: 'TO', perGame: true, totalKey: 'turnovers' },
];

export const RANKING_WEIGHTS = {
  ppg: 1.0,
  rpg: 0.8,
  apg: 0.9,
  spg: 0.6,
  bpg: 0.6,
  fgPct: 0.3,
  threePct: 0.2,
  ftPct: 0.1,
};

export const RANKING_CATEGORIES = [
  { key: 'overall', label: 'Overall' },
  { key: 'ppg', label: 'Points' },
  { key: 'rpg', label: 'Rebounds' },
  { key: 'apg', label: 'Assists' },
  { key: 'spg', label: 'Steals' },
  { key: 'bpg', label: 'Blocks' },
  { key: 'fgPct', label: 'FG%' },
  { key: 'threePct', label: '3P%' },
  { key: 'ftPct', label: 'FT%' },
];
