import { createContext,  useState, useEffect } from 'react'

export const WatchlistContext = createContext()

const STORAGE_KEY = 'cinema-app-watchlist'

export function WatchlistProvider({ children }) {
  
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

 
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
  }, [watchlist])
  
  const isInWatchlist = (id) => watchlist.some((m) => m.id === id)

   const toggleWatchlist = (movie) => {
    console.log('toggleWatchlist called with:', movie.title)
    setWatchlist((prev) => {
      const updated = prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
      console.log('new watchlist:', updated)
      return updated
    })
  }

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <WatchlistContext.Provider
      value={{ watchlist, isInWatchlist, toggleWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}
