import { CheckCircle, XCircle } from 'lucide-react'

function Toast({ message, type = 'success' }) {
  if (!message) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-100 animate-in">
      <div className="flex items-center gap-2 bg-cinema-surface border border-white/10 text-cinema-text px-5 py-3 rounded-full shadow-2xl">
        {type === 'success' ? (
          <CheckCircle size={18} className="text-cinema-gold" />
        ) : (
          <XCircle size={18} className="text-cinema-red" />
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}

export default Toast