import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function useMovies(endpoint, params = '') {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchMovies() {
      setLoading(true)
      setError(null)

      try {
        const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}${params}`
        const res = await fetch(url, { signal: controller.signal })

        if (!res.ok) {
          throw new Error(`TMDB request failed: ${res.status}`)
        }

        const json = await res.json()
        setData(json.results || [])
      } catch (err) {
        
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()

    return () => controller.abort()
  }, [endpoint, params])

  return { data, loading, error }
}

export default useMovies