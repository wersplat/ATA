import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';

export function usePlayerStats() {
  const { players } = useData();
  const [sortField, setSortField] = useState('ppg');
  const [sortDir, setSortDir] = useState('desc');
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('');

  const filtered = useMemo(() => {
    let result = [...players];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.team.toLowerCase().includes(q)
      );
    }

    if (teamFilter) {
      result = result.filter((p) => p.team === teamFilter);
    }

    result.sort((a, b) => {
      const aVal = a[sortField] ?? 0;
      const bVal = b[sortField] ?? 0;
      return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
    });

    return result;
  }, [players, sortField, sortDir, search, teamFilter]);

  const teams = useMemo(
    () => [...new Set(players.map((p) => p.team))].sort(),
    [players]
  );

  const toggleSort = (field) => {
    if (field === sortField) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  return {
    players: filtered,
    sortField,
    sortDir,
    toggleSort,
    search,
    setSearch,
    teamFilter,
    setTeamFilter,
    teams,
  };
}
