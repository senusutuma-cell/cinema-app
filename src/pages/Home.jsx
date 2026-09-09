import useMovies from '../hooks/useMovies'
function Home() {
  const { data: trending, loading, error } = useMovies('/trending/movie/week')

  return (
    <div className="min-h-screen bg-cinema-bg text-white p-10">
      <h1 className="font-display text-4xl text-cinema-gold">Trending This Week</h1>

     {loading && <p className="text-cinema-muted">Loading...</p>}
      {error && <p className="text-cinema-red">Error: {error}</p>} 

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {trending.map((movie) => (
          <div key={movie.id} className="bg-cinema-card rounded-lg p-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md w-full"
            />
            <p className="text-sm mt-2 truncate">{movie.title}</p>
          </div>
        ))}
      </div> 
    </div>
  )
}

export default Home