function YearRangeFilter({ fromYear, toYear, onFromChange, onToChange }) {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex items-center gap-2 text-sm">
      <input
        type="number"
        placeholder="From"
        value={fromYear}
        onChange={(e) => onFromChange(e.target.value)}
        min="1900"
        max={currentYear}
        className="w-24 bg-cinema-surface text-white px-3 py-2 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-cinema-gold placeholder:text-cinema-muted"
      />
      <span className="text-cinema-muted">to</span>
      <input
        type="number"
        placeholder="To"
        value={toYear}
        onChange={(e) => onToChange(e.target.value)}
        min="1900"
        max={currentYear}
        className="w-24 bg-cinema-surface text-white px-3 py-2 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-cinema-gold placeholder:text-cinema-muted"
      />
    </div>
  )
}

export default YearRangeFilter