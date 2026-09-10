import { useState, useEffect } from 'react'
import SearchInput from '../components/ui/SearchInput'
import MovieCard from '../components/movie/MovieCard'
import SkeletonCard from '../components/movie/SkeletonCard'
import useDebounce from '../hooks/useDebounce'

const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function SearchResults() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      return
    }

    const controller = new AbortController()

    async function fetchResults() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(debouncedQuery)}`,
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error('Search failed')
        const data = await res.json()
        setResults(data.results || [])
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
    return () => controller.abort()
  }, [debouncedQuery])

  return (
    <div className="min-h-screen bg-cinema-bg text-white px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-4xl text-cinema-gold mb-6 text-center">Search</h1>

      <SearchInput value={query} onChange={setQuery} />

      <div className="mt-10">
        {error && <p className="text-cinema-red text-center">{error}</p>}

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && !debouncedQuery.trim() && (
          <p className="text-cinema-muted text-center py-10">
            Start typing to search for movies.
          </p>
        )}

        {!loading && debouncedQuery.trim() && results.length === 0 && (
          <p className="text-cinema-muted text-center py-10">
            No results found for "{debouncedQuery}"
          </p>
        )}

        {!loading && debouncedQuery.trim() && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults