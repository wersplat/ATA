import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Players from './pages/Players';
import PlayerDetail from './pages/PlayerDetail';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import Rankings from './pages/Rankings';

export default function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
          <Header />
          <main className="flex-1">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/players" element={<Players />} />
                <Route path="/players/:id" element={<PlayerDetail />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/teams/:id" element={<TeamDetail />} />
                <Route path="/rankings" element={<Rankings />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </DataProvider>
    </BrowserRouter>
  );
}
