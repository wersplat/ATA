import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchSheetData } from '../services/googleSheets';
import { getCachedData, setCachedData } from '../services/cacheManager';
import {
  transformPlayerData,
  transformTeamData,
  transformHistoricalData,
  transformCareerHighs,
  attachCareerHighs,
} from '../services/dataTransformer';
import { SHEETS_CONFIG, REFRESH_INTERVAL } from '../constants/config';
import { DEMO_PLAYERS, DEMO_TEAMS, DEMO_HISTORICAL, DEMO_CAREER_HIGHS } from '../constants/demoData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [historical, setHistorical] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const hasSheetUrls =
    SHEETS_CONFIG.playersUrl || SHEETS_CONFIG.teamsUrl;

  const loadDemoData = useCallback(() => {
    const playerData = transformPlayerData(DEMO_PLAYERS);
    const careerHighsMap = transformCareerHighs(DEMO_CAREER_HIGHS);
    setPlayers(attachCareerHighs(playerData, careerHighsMap));
    setTeams(transformTeamData(DEMO_TEAMS));
    setHistorical(transformHistoricalData(DEMO_HISTORICAL));
    setLastUpdated(Date.now());
    setLoading(false);
  }, []);

  const fetchData = useCallback(
    async (forceRefresh = false) => {
      if (!hasSheetUrls) {
        loadDemoData();
        return;
      }

      if (!forceRefresh) {
        const cached = getCachedData('all_data');
        if (cached) {
          setPlayers(cached.players);
          setTeams(cached.teams);
          setHistorical(cached.historical);
          setLastUpdated(cached.timestamp);
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      try {
        const [playersRaw, teamsRaw, historicalRaw, careerHighsRaw] =
          await Promise.all([
            fetchSheetData(SHEETS_CONFIG.playersUrl),
            fetchSheetData(SHEETS_CONFIG.teamsUrl),
            fetchSheetData(SHEETS_CONFIG.historicalUrl),
            fetchSheetData(SHEETS_CONFIG.careerHighsUrl),
          ]);

        const playerData = transformPlayerData(playersRaw);
        const careerHighsMap = transformCareerHighs(careerHighsRaw);
        const playersWithHighs = attachCareerHighs(playerData, careerHighsMap);
        const teamData = transformTeamData(teamsRaw);
        const historicalData = transformHistoricalData(historicalRaw);

        setPlayers(playersWithHighs);
        setTeams(teamData);
        setHistorical(historicalData);
        setLastUpdated(Date.now());
        setError(null);

        setCachedData('all_data', {
          players: playersWithHighs,
          teams: teamData,
          historical: historicalData,
          timestamp: Date.now(),
        });
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err.message || 'Failed to load data');
        // Try to load from cache as fallback
        const cached = getCachedData('all_data');
        if (cached) {
          setPlayers(cached.players);
          setTeams(cached.teams);
          setHistorical(cached.historical);
          setLastUpdated(cached.timestamp);
        } else {
          loadDemoData();
        }
      } finally {
        setLoading(false);
      }
    },
    [hasSheetUrls, loadDemoData]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh
  useEffect(() => {
    if (!hasSheetUrls) return;
    const id = setInterval(() => fetchData(true), REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [hasSheetUrls, fetchData]);

  return (
    <DataContext.Provider
      value={{
        players,
        teams,
        historical,
        loading,
        error,
        lastUpdated,
        isDemo: !hasSheetUrls,
        refresh: () => fetchData(true),
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
