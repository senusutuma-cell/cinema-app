import { useState } from 'react'
import YearRangeFilter from '../components/ui/YearRangeFilter'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import useGenres from '../hooks/useGenres'
import GenreFilter from '../components/ui/GenreFilter'
import SortSelect from '../components/ui/SortSelect'
import MovieCard from '../components/movie/MovieCard'
import SkeletonCard from '../components/movie/SkeletonCard'

function Series() {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [fromYear, setFromYear] = useState('')
  const [toYear, setToYear] = useState('')

  const genres = useGenres('tv')

 const params = `&sort_by=${sortBy}${selectedGenre ? `&with_genres=${selectedGenre}` : ''}${
  fromYear ? `&first_air_date.gte=${fromYear}-01-01` : ''
}${toYear ? `&first_air_date.lte=${toYear}-12-31` : ''}`

  const { items: series, loading, error, sentinelRef, hasMore } = useInfiniteScroll(
    '/discover/tv',
    params
  )

  return (
    <div className="min-h-screen bg-cinema-bg text-cinema-text px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-4xl text-cinema-gold mb-6">Browse Series</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
  <GenreFilter genres={genres} selectedGenre={selectedGenre} onSelect={setSelectedGenre} />
  <div className="flex flex-col sm:flex-row items-center gap-3">
    <YearRangeFilter
      fromYear={fromYear}
      toYear={toYear}
      onFromChange={setFromYear}
      onToChange={setToYear}
    />
    <SortSelect value={sortBy} onChange={setSortBy} />
  </div>
</div>

      {error && <p className="text-cinema-red mb-4">Error: {error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {series.map((show) => <MovieCard key={show.id} movie={show} type="tv" />)}
    {loading && Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={`s-${i}`} />)}
    </div>

      {!loading && series.length === 0 && (
        <p className="text-cinema-muted text-center py-20">No series found for this filter.</p>
      )}
      {hasMore && <div ref={sentinelRef} className="h-4" />}
    </div>
  )
}

export default Series