import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Search, Bookmark, Film } from 'lucide-react'
import { useWatchlist } from '../../hooks/useWatchlist'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

 
const { watchlist } = useWatchlist()
const watchlistCount = watchlist.length
const { theme, toggleTheme } = useTheme()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/browse', label: 'Movies' },
    { to: '/series', label: 'Series' },
    { to: '/celebrities', label: 'Celebrities' },
    { to: '/search', label: 'Search' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-cinema-surface/70 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-cinema-gold font-display text-2xl tracking-wide">
            <Film size={24} />
            CINEMA
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-cinema-gold' : 'text-cinema-muted hover:text-cinema-text'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side: search icon + watchlist badge */}
         <div className="hidden md:flex items-center gap-6">
  <button onClick={toggleTheme} className="text-cinema-muted hover:text-cinema-text transition-colors" aria-label="Toggle theme">
    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
  </button>
  <Link to="/search" className="text-cinema-muted hover:text-cinema-text transition-colors">
    <Search size={20} />
  </Link>
  <Link to="/watchlist" className="relative text-cinema-muted hover:text-cinema-text transition-colors">
    <Bookmark size={20} />
    {watchlistCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-cinema-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {watchlistCount}
      </span>
    )}
  </Link>
</div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden text-cinema-text"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-cinema-surface border-t border-white/5 px-4 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'text-cinema-gold' : 'text-cinema-muted'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
                   <Link to="/watchlist" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-cinema-muted flex items-center gap-2">
            <Bookmark size={16} /> Watchlist ({watchlistCount})
          </Link>
          <button
            onClick={() => { toggleTheme(); setMobileOpen(false) }}
            className="text-sm font-medium text-cinema-muted flex items-center gap-2"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      )}
    </header>
  )
}

export default Navbar