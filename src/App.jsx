 import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { WatchlistProvider } from './context/WatchlistContext'
import { useWatchlist } from './hooks/useWatchlist'
import Series from './pages/Series'
import SeriesDetail from './pages/SeriesDetail'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import PageLoader from './components/layout/PageLoader'
import Toast from './components/ui/Toast'
import Celebrities from './pages/Celebrities'
import CelebrityDetail from './pages/CelebrityDetail'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import Browse from './pages/Browse'
import MovieDetail from './pages/MovieDetail'
import SearchResults from './pages/SearchResults'
import Watchlist from './pages/Watchlist'
import NotFound from './pages/NotFound'

function AppContent() {

  const { toastMessage } = useWatchlist()

  return (
    
    <BrowserRouter>
   <div className="bg-cinema-bg text-cinema-text min-h-screen transition-colors duration-200"> 
     <PageLoader />
      <Navbar />
      <Routes>
        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<SeriesDetail />} />
        <Route path="/celebrities" element={<Celebrities />} />
        <Route path="/celebrity/:id" element={<CelebrityDetail />} />
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
     <Toast message={toastMessage} />
     </div>
    </BrowserRouter>
  )
}
function App() {
  return (
    <ThemeProvider>
    <WatchlistProvider>
      <AppContent />
    </WatchlistProvider>
    </ThemeProvider>
  )
}

export default App 