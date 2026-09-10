import useMovies from '../hooks/useMovies'
import CelebrityCard from '../components/movie/CelebrityCard'
import SkeletonCard from '../components/movie/SkeletonCard'

function Celebrities() {
  const { data: people, loading, error } = useMovies('/person/popular')

  return (
    <div className="min-h-screen bg-cinema-bg text-white px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-4xl text-cinema-gold mb-6">Celebrities</h1>

      {error && <p className="text-cinema-red mb-4">Error: {error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading && Array.from({ length: 15 }).map((_, i) => <SkeletonCard key={i} />)}
        {!loading && people.map((person) => <CelebrityCard key={person.id} person={person} />)}
      </div>
    </div>
  )
}

export default Celebrities