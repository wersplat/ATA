export function transformPlayerData(raw) {
  return raw
    .filter((r) => r.Name)
    .map((r, i) => {
      const games = num(r.Games) || 1;
      const points = num(r.Points);
      const rebounds = num(r.Rebounds);
      const assists = num(r.Assists);
      const steals = num(r.Steals);
      const blocks = num(r.Blocks);
      const minutes = num(r.Minutes);
      const turnovers = num(r.Turnovers);

      return {
        id: slugify(r.Name),
        name: r.Name.trim(),
        team: (r.Team || 'Free Agent').trim(),
        games,
        points,
        rebounds,
        assists,
        steals,
        blocks,
        minutes,
        turnovers,
        fgPct: num(r['FG%']),
        threePct: num(r['3P%']),
        ftPct: num(r['FT%']),
        ppg: round(points / games),
        rpg: round(rebounds / games),
        apg: round(assists / games),
        spg: round(steals / games),
        bpg: round(blocks / games),
        mpg: round(minutes / games),
        topg: round(turnovers / games),
        _index: i,
      };
    });
}

export function transformTeamData(raw) {
  return raw
    .filter((r) => r.TeamName)
    .map((r) => {
      const wins = num(r.Wins);
      const losses = num(r.Losses);
      const pf = num(r.PointsFor);
      const pa = num(r.PointsAgainst);
      return {
        id: slugify(r.TeamName),
        name: r.TeamName.trim(),
        wins,
        losses,
        winPct: wins + losses > 0 ? round(wins / (wins + losses), 3) : 0,
        pointsFor: pf,
        pointsAgainst: pa,
        pointDiff: pf - pa,
        conference: (r.Conference || '').trim(),
      };
    });
}

export function transformHistoricalData(raw) {
  return raw
    .filter((r) => r.PlayerName)
    .map((r) => ({
      week: num(r.Week),
      date: r.Date || '',
      playerName: r.PlayerName.trim(),
      playerId: slugify(r.PlayerName),
      points: num(r.Points),
      rebounds: num(r.Rebounds),
      assists: num(r.Assists),
      steals: num(r.Steals),
      blocks: num(r.Blocks),
      rank: num(r.Rank),
      team: (r.Team || '').trim(),
    }));
}

export function transformCareerHighs(raw) {
  const map = {};
  raw
    .filter((r) => r.PlayerName)
    .forEach((r) => {
      map[slugify(r.PlayerName)] = {
        points: num(r.HighPoints),
        rebounds: num(r.HighRebounds),
        assists: num(r.HighAssists),
        steals: num(r.HighSteals),
        blocks: num(r.HighBlocks),
        date: r.HighDate || '',
      };
    });
  return map;
}

export function attachCareerHighs(players, careerHighsMap) {
  return players.map((p) => ({
    ...p,
    careerHighs: careerHighsMap[p.id] || null,
  }));
}

function num(val) {
  if (val == null || val === '') return 0;
  const n = typeof val === 'number' ? val : parseFloat(String(val).replace(/[^0-9.-]/g, ''));
  return isNaN(n) ? 0 : n;
}

function round(val, decimals = 1) {
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
