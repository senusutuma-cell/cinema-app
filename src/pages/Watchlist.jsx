import { Link } from 'react-router-dom'
import { Bookmark } from 'lucide-react'
import { useWatchlist } from '../hooks/useWatchlist'
import MovieCard from '../components/movie/MovieCard'

function Watchlist() {
  const { watchlist } = useWatchlist()

  return (
    <div className="min-h-screen bg-cinema-bg text-cinema-text px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-4xl text-cinema-gold mb-6">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Bookmark size={48} className="text-cinema-muted mb-4" />
          <p className="text-cinema-muted mb-6">Your watchlist is empty.</p>
          <Link
            to="/browse"
            className="bg-cinema-gold text-black px-6 py-2.5 rounded-full font-semibold hover:bg-white transition-colors"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Watchlist