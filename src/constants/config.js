export const SHEETS_CONFIG = {
  playersUrl: import.meta.env.VITE_PLAYERS_SHEET_URL || '',
  teamsUrl: import.meta.env.VITE_TEAMS_SHEET_URL || '',
  historicalUrl: import.meta.env.VITE_HISTORICAL_SHEET_URL || '',
  careerHighsUrl: import.meta.env.VITE_CAREER_HIGHS_SHEET_URL || '',
};

export const CACHE_TTL = parseInt(import.meta.env.VITE_CACHE_TTL) || 300000; // 5 minutes

export const REFRESH_INTERVAL = 300000; // 5 minutes
