import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useMovies from '../../hooks/useMovies'

function MovieRow({ title, endpoint }) {
  const scrollRef = useRef(null)
  const { data: movies, loading, error } = useMovies(endpoint)

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const amount = direction === 'left' ? -600 : 600
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-cinema-red">Failed to load {title}: {error}</p>
      </div>
    )
  }

  return (
    <section className="py-6 group/row relative">
      <h2 className="font-display text-2xl text-white px-4 sm:px-6 lg:px-8 mb-4 tracking-wide">
        {title}
      </h2>

      {/* Scroll buttons  */}
      <button
        onClick={() => scroll('left')}
        className="hidden sm:flex opacity-0 group-hover/row:opacity-100 transition-opacity absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white h-full w-12 items-center justify-center"
        aria-label="Scroll left"
      >
        <ChevronLeft size={28} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth px-4 sm:px-6 lg:px-8 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-none]"
      >
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="shrink-0 w-40 sm:w-50 aspect[-2/3] rounded-lg bg-cinema-card animate-pulse"
            />
          ))}

        {!loading &&
          movies.map((movie) => (
            <div
              key={movie.id}
              className="shrink-0 w-400 sm:w-50 rounded-lg overflow-hidden bg-cinema-card hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://placehold.co/500x750/1c1c28/8a8a9a?text=No+Image'
                }
                alt={movie.title || movie.name}
                className="w-full aspect[-2/3] object-cover"
              />
              <p className="text-xs text-white p-2 truncate">{movie.title || movie.name}</p>
            </div>
          ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="hidden sm:flex opacity-0 group-hover/row:opacity-100 transition-opacity absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white h-full w-12 items-center justify-center"
        aria-label="Scroll right"
      >
        <ChevronRight size={28} />
      </button>
    </section>
  )
}

export default MovieRow