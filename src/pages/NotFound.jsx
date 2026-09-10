import { Link } from 'react-router-dom'
import { Film } from 'lucide-react'

function NotFound() {
  return (
    <div className="min-h-screen bg-cinema-bg flex flex-col items-center justify-center gap-4 text-center px-4">
      <Film size={48} className="text-cinema-red" />
      <h1 className="font-display text-6xl text-cinema-red">404</h1>
      <p className="text-cinema-muted max-w-sm">
        This page doesn't exist — maybe it got cut from the final edit.
      </p>
      <Link
        to="/"
        className="bg-cinema-gold text-black px-6 py-2.5 rounded-full font-semibold hover:bg-white transition-colors mt-2"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound