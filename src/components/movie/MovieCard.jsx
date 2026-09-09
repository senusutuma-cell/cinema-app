import { Link } from 'react-router-dom'
import { Heart, Plus, Star } from 'lucide-react'

function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750/1c1c28/8a8a9a?text=No+Image'

  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4)
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'

  
  const isInWatchlist = false
  const toggleWatchlist = (e) => {
    e.preventDefault()
    console.log('toggle watchlist for', movie.id)
  }

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative shrink-0 w-40 sm:w-50 rounded-lg overflow-hidden bg-cinema-card hover:scale-105 transition-transform duration-200"
    >
      {/* Poster image */}
      <img
        src={posterUrl}
        alt={movie.title || movie.name}
        className="w-full aspect[-2/3] object-cover"
        loading="lazy"
      />

      {/* Rating badge  */}
      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-md px-2 py-0.5 flex items-center gap-1">
        <Star size={12} className="text-cinema-gold" fill="currentColor" />
        <span className="text-xs text-white font-medium">{rating}</span>
      </div>

      {/* Heart/bookmark */}
      <button
        onClick={toggleWatchlist}
        className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full p-1.5 hover:bg-cinema-red transition-colors"
        aria-label="Toggle watchlist"
      >
        <Heart size={14} className={isInWatchlist ? 'fill-cinema-red text-cinema-red' : 'text-white'} />
      </button>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
        <p className="text-white text-sm font-semibold truncate">{movie.title || movie.name}</p>
        <p className="text-cinema-muted text-xs mb-2">{year}</p>
        <button
          onClick={toggleWatchlist}
          className="flex items-center justify-center gap-1 bg-white/90 hover:bg-white text-black text-xs font-semibold rounded-md py-1.5 transition-colors"
        >
          <Plus size={14} /> Watchlist
        </button>
      </div>

      {/* Title shown below poster when NOT hovering  */}
      <p className="text-xs text-white p-2 truncate group-hover:opacity-0 transition-opacity">
        {movie.title || movie.name}
      </p>
    </Link>
  )
}

export default MovieCard