import { useState, useEffect, useRef, useCallback } from 'react'

const API_KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function useInfiniteScroll(endpoint, params = '') {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const observerRef = useRef(null)
  const sentinelRef = useRef(null)

  useEffect(() => {
    setItems([])
    setPage(1)
    setTotalPages(1)
  }, [endpoint, params])

 
  useEffect(() => {
    const controller = new AbortController()

    async function fetchPage() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `${BASE_URL}${endpoint}?api_key=${API_KEY}${params}&page=${page}`,
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error('Failed to load results')
        const data = await res.json()

        setItems((prev) => (page === 1 ? data.results : [...prev, ...data.results]))
        setTotalPages(data.total_pages || 1)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
    return () => controller.abort()
  }, [endpoint, params, page])

  
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && page < totalPages) {
          setPage((prev) => prev + 1)
        }
      },
      { rootMargin: '400px' } )

    if (sentinelRef.current) observerRef.current.observe(sentinelRef.current)

    return () => observerRef.current?.disconnect()
  }, [loading, page, totalPages])

  return { items, loading, error, sentinelRef, hasMore: page < totalPages }
}

export default useInfiniteScroll