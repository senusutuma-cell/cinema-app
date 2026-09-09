import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Browse from './pages/Browse'
import MovieDetail from './pages/MovieDetail'
import SearchResults from './pages/SearchResults'
import Watchlist from './pages/Watchlist'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      {/* Temporary nav just to test links  */}
      <nav className="bg-cinema-surface p-4 flex gap-6 text-cinema-muted">
        <Link to="/" className="hover:text-cinema-gold transition-colors">Home</Link>
        <Link to="/browse" className="hover:text-cinema-gold transition-colors">Browse</Link>
        <Link to="/movie/1" className="hover:text-cinema-gold transition-colors">Movie Detail</Link>
        <Link to="/search" className="hover:text-cinema-gold transition-colors">Search</Link>
        <Link to="/watchlist" className="hover:text-cinema-gold transition-colors">Watchlist</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App