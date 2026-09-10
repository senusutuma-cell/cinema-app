import { Search } from 'lucide-react'

function SearchInput({ value, onChange }) {
  return (
    <div className="relative max-w-xl mx-auto">
      <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-cinema-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies..."
        className="w-full bg-cinema-surface text-white pl-12 pr-4 py-3 rounded-full border border-white/10 focus:outline-none focus:ring-2 focus:ring-cinema-gold placeholder:text-cinema-muted"
        autoFocus
      />
    </div>
  )
}

export default SearchInput