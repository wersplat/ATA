import { Link, useLocation } from 'react-router-dom';
import { RefreshCw, Menu, X, Trophy } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../../context/DataContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/players', label: 'Players' },
  { to: '/teams', label: 'Teams' },
  { to: '/rankings', label: 'Rankings' },
];

export default function Header() {
  const { refresh, loading, lastUpdated, isDemo } = useData();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-league-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Trophy className="w-6 h-6 text-gold" />
            <span>ATA League</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-league-300 ${
                  location.pathname === link.to
                    ? 'text-league-300 border-b-2 border-league-300 pb-0.5'
                    : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isDemo && (
              <span className="hidden sm:inline text-xs bg-yellow-600 text-white px-2 py-1 rounded">
                Demo Data
              </span>
            )}
            {lastUpdated && (
              <span className="hidden sm:inline text-xs text-gray-400">
                Updated {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={refresh}
              disabled={loading}
              className="p-2 hover:bg-league-800 rounded-lg transition-colors disabled:opacity-50"
              title="Refresh data"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              />
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 hover:bg-league-800 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-league-800 pt-3 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === link.to
                    ? 'bg-league-800 text-league-300'
                    : 'text-gray-300 hover:bg-league-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
