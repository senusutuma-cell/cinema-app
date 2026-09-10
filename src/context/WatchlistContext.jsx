import { createContext, useState, useEffect } from 'react'

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

  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
  }, [watchlist])

  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(''), 2500)
    return () => clearTimeout(timer)
  }, [toastMessage])

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id)

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const alreadyIn = prev.some((m) => m.id === movie.id)
      setToastMessage(
        alreadyIn
          ? `Removed "${movie.title || movie.name}" from watchlist`
          : `Added "${movie.title || movie.name}" to watchlist`
      )
      return alreadyIn
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    })
  }

  const removeFromWatchlist = (id, title) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id))
    if (title) setToastMessage(`Removed "${title}" from watchlist`)
  }

  return (
    <WatchlistContext.Provider
      value={{ watchlist, isInWatchlist, toggleWatchlist, removeFromWatchlist, toastMessage }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}