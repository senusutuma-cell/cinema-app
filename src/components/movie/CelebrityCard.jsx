import { Link } from 'react-router-dom'

function CelebrityCard({ person }) {
  const photoUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
    : 'https://placehold.co/300x450/1c1c28/8a8a9a?text=No+Photo'

  const knownFor = person.known_for
    ?.map((item) => item.title || item.name)
    .filter(Boolean)
    .slice(0, 2)
    .join(', ')

  return (
    <Link
      to={`/celebrity/${person.id}`}
      className="group relative shrink-0 w-40 sm:w-50 rounded-lg overflow-hidden bg-cinema-card hover:scale-105 transition-transform duration-200"
    >
      <img
        src={photoUrl}
        alt={person.name}
        className="w-full aspect-[2/3] object-cover"
        loading="lazy"
      />
      <div className="p-2">
        <p className="text-sm text-white font-medium truncate">{person.name}</p>
        {knownFor && (
          <p className="text-xs text-cinema-muted truncate">{knownFor}</p>
        )}
      </div>
    </Link>
  )
}

export default CelebrityCard