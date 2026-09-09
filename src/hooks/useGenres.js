import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_TMDB_KEY

function useGenres() {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchGenres() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
          { signal: controller.signal }
        )
        const json = await res.json()
        setGenres(json.genres || [])
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err)
      }
    }

    fetchGenres()
    return () => controller.abort()
  }, [])

  return genres
}

export default useGenres