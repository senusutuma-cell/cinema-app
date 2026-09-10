import { useState, useEffect } from 'react'
import SearchInput from '../components/ui/SearchInput'
import MovieCard from '../components/movie/MovieCard'
import CelebrityCard from '../components/movie/CelebrityCard'
import SkeletonCard from '../components/movie/SkeletonCard'
import useDebounce from '../hooks/useDebounce'

const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'movie', label: 'Movies' },
  { value: 'tv', label: 'Series' },
  { value: 'person', label: 'Celebrities' },
]

function SearchResults() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (!debouncedQuery.trim()) return

    const controller = new AbortController()

    async function fetchResults() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(debouncedQuery)}`,
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error('Search failed')
        const data = await res.json()

        const filtered = (data.results || []).filter(
          (r) =>
            (r.media_type === 'movie' || r.media_type === 'tv' || r.media_type === 'person') &&
            (r.poster_path || r.profile_path)
        )
        setResults(filtered)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
    return () => controller.abort()
  }, [debouncedQuery])

    const displayedResults =
    activeFilter === 'all' ? results : results.filter((r) => r.media_type === activeFilter)

  return (
    <div className="min-h-screen bg-cinema-bg text-cinema-text px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-4xl text-cinema-gold mb-6 text-center">Search</h1>

      <SearchInput value={query} onChange={setQuery} />

 {debouncedQuery.trim() && (
        <div className="flex justify-center gap-2 mt-6">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f.value
                  ? 'bg-cinema-gold text-black'
                  : 'bg-cinema-surface text-cinema-muted hover:text-cinema-text'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

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
        
        {!loading && displayedResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayedResults.map((item) =>
              item.media_type === 'person' ? (
                <CelebrityCard key={item.id} person={item} />
              ) : (
                <MovieCard key={item.id} movie={item} type={item.media_type} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults