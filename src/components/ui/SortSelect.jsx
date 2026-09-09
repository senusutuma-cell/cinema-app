function SortSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-cinema-surface text-white text-sm rounded-md px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cinema-gold"
    >
      <option value="popularity.desc">Most Popular</option>
      <option value="vote_average.desc">Highest Rated</option>
      <option value="release_date.desc">Newest</option>
      <option value="release_date.asc">Oldest</option>
    </select>
  )
}

export default SortSelect