import { X } from 'lucide-react'
import { useEffect } from 'react'

function TrailerModal({ videoKey, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (!videoKey) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl aspect-video"
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-cinema-text hover:text-cinema-gold transition-colors"
          aria-label="Close trailer"
        >
          <X size={28} />
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
  )
}

export default TrailerModal