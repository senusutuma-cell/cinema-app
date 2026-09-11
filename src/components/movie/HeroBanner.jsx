import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Info, ChevronLeft, ChevronRight } from 'lucide-react'
import useMovies from '../../hooks/useMovies'

const SLIDE_COUNT = 5

function HeroBanner() {
  const { data: movies, loading } = useMovies('/trending/movie/week')
  const [activeIndex, setActiveIndex] = useState(0)

  const slides = movies.slice(0, SLIDE_COUNT)
  const featured = slides[activeIndex]

  const goTo = (index) => {
    setActiveIndex((index + slides.length) % slides.length)
  }

  if (loading || !featured) {
    return <div className="w-full h-[70vh] bg-cinema-surface animate-pulse" />
  }

  return (
    <div className="relative w-full h-[70vh] text-white overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
        alt={featured.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-cinema-bg/80 via-transparent to-transparent" />

      {/* Left/Right arrows */}
      <button
        onClick={() => goTo(activeIndex - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => goTo(activeIndex + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 sm:p-10 lg:p-16 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-cinema-muted mb-2">
          Trending This Week
        </p>
        <h1 className="font-display text-4xl sm:text-6xl tracking-wide mb-4 drop-shadow-lg">
          {featured.title}
        </h1>
        <div className="flex items-center gap-3 text-sm mb-4">
          <span className="flex items-center gap-1 text-cinema-gold font-semibold">
            ★ {featured.vote_average?.toFixed(1)}
          </span>
          <span className="text-cinema-muted">•</span>
          <span className="font-medium">{featured.release_date?.slice(0, 4)}</span>
          <span className="text-cinema-muted">•</span>
          <span className="font-medium">Movie</span>
        </div>
        <p className="text-cinema-muted line-clamp-3 mb-6 text-sm sm:text-base">
          {featured.overview}
        </p>
        <Link
          to={`/movie/${featured.id}`}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-md font-semibold hover:bg-white/30 transition-colors"
        >
          <Info size={20} /> See more
        </Link>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroBanner