import HeroBanner from '../components/movie/HeroBanner'
import MovieRow from '../components/movie/MovieRow'

function Home() {
  return (
    <div className="bg-cinema-bg min-h-screen">
      <HeroBanner />
      <div className="-mt-16 relative z-10">
        <MovieRow title="Trending This Week" endpoint="/trending/movie/week" />
        <MovieRow title="Popular Movies" endpoint="/movie/popular" />
        <MovieRow title="Top Rated" endpoint="/movie/top_rated" />
      </div>
    </div>
  )
}

export default Home