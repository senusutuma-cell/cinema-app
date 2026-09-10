function GenreFilter({ genres, selectedGenre, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible pb-2 [&::-webkit-scrollbar]:hidden [scrollbar-none]">
      <button
        onClick={() => onSelect(null)}
        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          selectedGenre === null
            ? 'bg-cinema-gold text-black'
            : 'bg-cinema-surface text-cinema-muted hover:text-cinema-text'
        }`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selectedGenre === genre.id
              ? 'bg-cinema-gold text-black'
              : 'bg-cinema-surface text-cinema-muted hover:text-cinema-text'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter