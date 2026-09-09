import { Link } from 'react-router-dom'
import { Play, Info } from 'lucide-react'
import useMovies from '../../hooks/useMovies'

function HeroBanner() {
  const { data: movies, loading } = useMovies('/trending/movie/week')
  const featured = movies[0]

  if (loading || !featured) {
    return <div className="w-full h-[70vh] bg-cinema-surface animate-pulse" />
  }

  return (
    <div className="relative w-full h-[70vh] text-white">
      {/* Backdrop image */}
      <img
        src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
        alt={featured.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlays — bottom-to-top AND left-to-right, layered */}
      <div className="absolute inset-0 bg-linear-to-t from-cinema-bg via-cinema-bg/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-cinema-bg/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 sm:p-10 lg:p-16 max-w-2xl">
        <h1 className="font-display text-4xl sm:text-6xl tracking-wide mb-4 drop-shadow-lg">
          {featured.title}
        </h1>
        <p className="text-cinema-muted line-clamp-3 mb-6 text-sm sm:text-base">
          {featured.overview}
        </p>
        <div className="flex gap-4">
          <Link
            to={`/movie/${featured.id}`}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-cinema-gold transition-colors"
          >
            <Play size={20} fill="black" /> Watch Trailer
          </Link>
          <Link
            to={`/movie/${featured.id}`}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-md font-semibold hover:bg-white/30 transition-colors"
          >
            <Info size={20} /> More Info
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner