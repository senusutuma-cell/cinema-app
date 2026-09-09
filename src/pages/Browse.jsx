import { useState } from 'react'
import useMovies from '../hooks/useMovies'
import useGenres from '../hooks/useGenres'
import GenreFilter from '../components/ui/GenreFilter'
import SortSelect from '../components/ui/SortSelect'
import MovieCard from '../components/movie/MovieCard'
import SkeletonCard from '../components/movie/SkeletonCard'

function Browse() {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [sortBy, setSortBy] = useState('popularity.desc')

  const genres = useGenres()

  const params = `&sort_by=${sortBy}${selectedGenre ? `&with_genres=${selectedGenre}` : ''}`
  const { data: movies, loading, error } = useMovies('/discover/movie', params)

  return (
    <div className="min-h-screen bg-cinema-bg text-white px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-4xl text-cinema-gold mb-6">Browse Movies</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <GenreFilter genres={genres} selectedGenre={selectedGenre} onSelect={setSelectedGenre} />
        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>

      {error && <p className="text-cinema-red mb-4">Error: {error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading && Array.from({ length: 15 }).map((_, i) => <SkeletonCard key={i} />)}
        {!loading && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {!loading && movies.length === 0 && (
        <p className="text-cinema-muted text-center py-20">No movies found for this filter.</p>
      )}
    </div>
  )
}

export default Browse