import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Star, Play, Heart } from 'lucide-react'
import { useWatchlist } from '../hooks/useWatchlist'

const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function MovieDetail() {
  const { id } = useParams()

  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [trailerKey, setTrailerKey] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { isInWatchlist, toggleWatchlist } = useWatchlist()

  useEffect(() => {
    const controller = new AbortController()

    async function fetchAll() {
      setLoading(true)
      setError(null)
      try {
        const [detailRes, creditsRes, videosRes, similarRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, { signal: controller.signal }),
          fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`, { signal: controller.signal }),
          fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`, { signal: controller.signal }),
          fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`, { signal: controller.signal }),
        ])

        if (!detailRes.ok) throw new Error('Movie not found')

        const detailData = await detailRes.json()
        const creditsData = creditsRes.ok ? await creditsRes.json() : {}
        const videosData = videosRes.ok ? await videosRes.json() : {}
        const similarData = similarRes.ok ? await similarRes.json() : {}

        setMovie(detailData)
        setCast(creditsData.cast?.slice(0, 10) || [])

        const trailer = videosData.results?.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        )
        setTrailerKey(trailer ? trailer.key : null)

        setSimilar(similarData.results?.slice(0, 10) || [])
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
    return () => controller.abort()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-bg flex items-center justify-center text-cinema-muted">
        Loading...
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-cinema-bg flex flex-col items-center justify-center gap-2">
        <p className="text-cinema-red text-xl">{error || 'Movie not found'}</p>
        <Link to="/" className="text-cinema-gold hover:underline">
          Back to Home
        </Link>
      </div>
    )
  }

  const inWatchlist = isInWatchlist(movie.id)

  return (
    <div className="bg-cinema-bg min-h-screen text-white">
      <div className="relative w-full h-[60vh]">
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : 'https://placehold.co/1280x720/1c1c28/8a8a9a?text=No+Backdrop'
          }
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-cinema-bg via-cinema-bg/60 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 sm:p-10 flex gap-6 items-end max-w-5xl">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : 'https://placehold.co/300x450/1c1c28/8a8a9a?text=No+Image'
            }
            alt={movie.title}
            className="hidden sm:block w-40 rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="font-display text-4xl sm:text-5xl tracking-wide mb-2">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-cinema-muted mb-4">
              <span className="flex items-center gap-1">
                <Star size={16} className="text-cinema-gold" fill="currentColor" />
                {movie.vote_average?.toFixed(1)}
              </span>
              <span>{movie.release_date?.slice(0, 4)}</span>
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map((g) => (
                <span key={g.id} className="bg-cinema-surface text-xs px-3 py-1 rounded-full">
                  {g.name}
                </span>
              ))}
            </div>
            <button
              onClick={() => toggleWatchlist(movie)}
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-md font-semibold hover:bg-cinema-gold transition-colors"
            >
              <Heart size={18} className={inWatchlist ? 'fill-cinema-red text-cinema-red' : ''} />
              {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-10 py-8 max-w-4xl">
        <h2 className="text-xl font-semibold mb-3">Overview</h2>
        <p className="text-cinema-muted leading-relaxed mb-6">{movie.overview}</p>

        {trailerKey && (
          <a
            href={`https://www.youtube.com/watch?v=${trailerKey}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cinema-red hover:bg-cinema-red-hover transition-colors px-5 py-2.5 rounded-md font-semibold"
          >
            <Play size={18} fill="white" /> Watch Trailer
          </a>
        )}
      </div>

      {cast.length > 0 && (
        <div className="px-6 sm:px-10 py-6">
          <h2 className="text-xl font-semibold mb-4">Cast</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [scrollbar-none]">
            {cast.map((person) => (
              <div key={person.id} className="shrink-0 w-28 text-center">
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                      : 'https://placehold.co/185x278/1c1c28/8a8a9a?text=No+Photo'
                  }
                  alt={person.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto mb-2"
                />
                <p className="text-xs font-medium truncate">{person.name}</p>
                <p className="text-xs text-cinema-muted truncate">{person.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {similar.length > 0 && (
        <div className="px-6 sm:px-10 py-6">
          <h2 className="text-xl font-semibold mb-4">Similar Movies</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [scrollbar-none]">
            {similar.map((m) => (
              <Link
                key={m.id}
                to={`/movie/${m.id}`}
                className="shrink-0 w-32 sm:w-40 rounded-lg overflow-hidden bg-cinema-card hover:scale-105 transition-transform"
              >
                <img
                  src={
                    m.poster_path
                      ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                      : 'https://placehold.co/300x450/1c1c28/8a8a9a?text=No+Image'
                  }
                  alt={m.title}
                  className="w-full aspect[-2/3] object-cover"
                />
                <p className="text-xs p-2 truncate">{m.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetail