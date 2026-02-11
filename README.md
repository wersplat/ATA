# ATA Basketball League

A basketball league statistics website that tracks player stats, career highs, rankings, and team standings — powered by Google Sheets.

## Features

- **Player Statistics** — Sortable/filterable stats table with per-game averages and season totals
- **Career Highs** — Gold star badges highlight when a player's stats match their career bests
- **Rankings** — Overall composite rankings and category-specific leaderboards (PTS, REB, AST, STL, BLK, FG%, 3P%, FT%)
- **Team Standings** — Win/loss records, point differentials, and full team rosters
- **Historical Trends** — Line charts showing ranking changes over time
- **Google Sheets Integration** — Live data from publicly published Google Sheets
- **Responsive Design** — Tables on desktop, card layouts on mobile
- **Caching** — localStorage cache with 5-minute TTL and auto-refresh

## Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:5173** — the app loads with built-in demo data (12 players, 4 teams).

## Connecting Google Sheets

### 1. Create Your Spreadsheet

Create a Google Sheet with four tabs:

**Players** (Sheet 1)

| Name | Team | Games | Points | Rebounds | Assists | Steals | Blocks | FG% | 3P% | FT% | Minutes | Turnovers |
|------|------|-------|--------|----------|---------|--------|--------|-----|-----|-----|---------|-----------|
| Marcus Johnson | Thunder | 12 | 312 | 96 | 84 | 24 | 12 | 48.5 | 38.2 | 85.0 | 420 | 30 |

**Teams** (Sheet 2)

| TeamName | Wins | Losses | PointsFor | PointsAgainst | Conference |
|----------|------|--------|-----------|---------------|------------|
| Thunder | 9 | 3 | 1120 | 1020 | East |

**Historical** (Sheet 3) — Weekly cumulative snapshots for trend charts

| Week | Date | PlayerName | Points | Rebounds | Assists | Steals | Blocks | Rank | Team |
|------|------|------------|--------|----------|---------|--------|--------|------|------|
| 1 | 2024-01-07 | Marcus Johnson | 78 | 24 | 21 | 6 | 3 | 2 | Thunder |

**Career Highs** (Sheet 4) — Single-game career bests

| PlayerName | HighPoints | HighRebounds | HighAssists | HighSteals | HighBlocks | HighDate |
|------------|------------|--------------|-------------|------------|------------|----------|
| Marcus Johnson | 42 | 14 | 12 | 5 | 3 | 2024-01-20 |

### 2. Publish Your Sheets

1. Open Google Sheets → **File → Share → Publish to web**
2. Select each sheet tab individually
3. Choose **Comma-separated values (.csv)** as the format
4. Click **Publish** and copy each URL

### 3. Configure Environment

Copy the example env file and add your URLs:

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_PLAYERS_SHEET_URL=https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?gid=0&single=true&output=csv
VITE_TEAMS_SHEET_URL=https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?gid=1&single=true&output=csv
VITE_HISTORICAL_SHEET_URL=https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?gid=2&single=true&output=csv
VITE_CAREER_HIGHS_SHEET_URL=https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?gid=3&single=true&output=csv
VITE_CACHE_TTL=300000
```

Restart the dev server — your live data will appear.

## Project Structure

```
src/
├── components/
│   ├── common/       # Header, Footer, LoadingSpinner, ErrorBoundary
│   ├── stats/        # StatsTable, StatCard, StatsFilter
│   ├── rankings/     # RankingsTable, TrendChart, CategorySelector, RankingCard
│   ├── player/       # PlayerCard, PlayerStatsGrid, PlayerHistory
│   └── team/         # TeamCard, TeamRoster, TeamStatsOverview
├── pages/            # Home, Players, PlayerDetail, Teams, TeamDetail, Rankings
├── services/         # googleSheets.js, cacheManager.js, dataTransformer.js
├── hooks/            # usePlayerStats, useRankings
├── utils/            # rankingAlgorithms.js, formatting.js
├── constants/        # statCategories.js, config.js, demoData.js
├── context/          # DataContext.jsx (global state)
├── App.jsx           # Router setup
├── main.jsx          # Entry point
└── index.css         # Tailwind + global styles
```

## Ranking Formula

Overall rankings use a weighted composite score:

| Stat | Weight |
|------|--------|
| PPG  | 1.0    |
| APG  | 0.9    |
| RPG  | 0.8    |
| SPG  | 0.6    |
| BPG  | 0.6    |
| FG%  | 0.3    |
| 3P%  | 0.2    |
| FT%  | 0.1    |

Weights can be adjusted in `src/constants/statCategories.js`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |

## Tech Stack

- [React 18](https://react.dev) + [Vite](https://vite.dev)
- [React Router 7](https://reactrouter.com)
- [TailwindCSS 3](https://tailwindcss.com)
- [Recharts](https://recharts.org) — Charts and trend visualization
- [PapaParse](https://papaparse.com) — CSV parsing for Google Sheets
- [Axios](https://axios-http.com) — HTTP requests
- [Lucide React](https://lucide.dev) — Icons
