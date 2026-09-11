import { Link } from 'react-router-dom'
import { Film, ExternalLink } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-cinema-surface border-t border-white/5 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <Link to="/" className="flex items-center gap-2 text-cinema-gold font-display text-2xl tracking-wide mb-2">
              <Film size={22} />
              CINEMA
            </Link>
            <p className="text-cinema-muted text-sm max-w-sm">
              A movie discovery app built with React and Tailwind CSS. Data provided by TMDB.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex gap-6 text-sm">
              <Link to="/browse" className="text-cinema-muted hover:text-cinema-gold transition-colors">
                Movies
              </Link>
              <Link to="/series" className="text-cinema-muted hover:text-cinema-gold transition-colors">
                Series
              </Link>
              <Link to="/celebrities" className="text-cinema-muted hover:text-cinema-gold transition-colors">
                Celebrities
              </Link>
              <Link to="/watchlist" className="text-cinema-muted hover:text-cinema-gold transition-colors">
                Watchlist
              </Link>
            </div>
            <a
              href="https://github.com/senusutuma-cell/cinema-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-cinema-muted hover:text-cinema-text transition-colors text-sm"
            >
             <ExternalLink size={16} /> View on GitHub
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-6 text-center text-xs text-cinema-muted">
          This product uses the TMDB API but is not endorsed or certified by TMDB. Built for educational purposes.
        </div>
      </div>
    </footer>
  )
}

export default Footer