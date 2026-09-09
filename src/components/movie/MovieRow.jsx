import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useMovies from '../../hooks/useMovies'
import MovieCard from './MovieCard'
import SkeletonCard from './SkeletonCard'

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
        {loading && Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}

        {!loading && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
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