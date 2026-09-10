import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Cake, MapPin } from 'lucide-react'

const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function CelebrityDetail() {
  const { id } = useParams()

  const [person, setPerson] = useState(null)
  const [credits, setCredits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchAll() {
      setLoading(true)
      setError(null)
      try {
        const [detailRes, creditsRes] = await Promise.all([
          fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}`, { signal: controller.signal }),
          fetch(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`, { signal: controller.signal }),
        ])

        if (!detailRes.ok) throw new Error('Person not found')

        const detailData = await detailRes.json()
        const creditsData = creditsRes.ok ? await creditsRes.json() : {}

        setPerson(detailData)

        const sortedCredits = (creditsData.cast || [])
          .filter((c) => c.poster_path)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 12)
        setCredits(sortedCredits)
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

  if (error || !person) {
    return (
      <div className="min-h-screen bg-cinema-bg flex flex-col items-center justify-center gap-2">
        <p className="text-cinema-red text-xl">{error || 'Person not found'}</p>
        <Link to="/" className="text-cinema-gold hover:underline">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-cinema-bg min-h-screen text-white px-4 sm:px-10 py-10">
      <div className="flex flex-col sm:flex-row gap-8 max-w-5xl mx-auto mb-10">
        <img
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
              : 'https://placehold.co/300x450/1c1c28/8a8a9a?text=No+Photo'
          }
          alt={person.name}
          className="w-48 rounded-lg shadow-2xl mx-auto sm:mx-0"
        />
        <div>
          <h1 className="font-display text-4xl sm:text-5xl tracking-wide mb-3">
            {person.name}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-cinema-muted mb-4">
            {person.birthday && (
              <span className="flex items-center gap-1">
                <Cake size={16} /> {person.birthday}
              </span>
            )}
            {person.place_of_birth && (
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {person.place_of_birth}
              </span>
            )}
          </div>
          <p className="text-cinema-muted leading-relaxed max-w-2xl">
            {person.biography || 'No biography available.'}
          </p>
        </div>
      </div>

      {credits.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Known For</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {credits.map((credit) => (
              <Link
                key={credit.id}
                to={`/movie/${credit.id}`}
                className="shrink-0 w-32 sm:w-40 rounded-lg overflow-hidden bg-cinema-card hover:scale-105 transition-transform"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${credit.poster_path}`}
                  alt={credit.title}
                  className="w-full aspect-[2/3] object-cover"
                />
                <p className="text-xs p-2 truncate">{credit.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CelebrityDetail