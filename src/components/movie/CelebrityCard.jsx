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
      className="group relative shrink-0 w-40 sm:w-48 rounded-xl overflow-hidden bg-cinema-card border border-white/5 hover:border-cinema-gold/30 hover:scale-105 hover:shadow-xl hover:shadow-black/50 transition-all duration-300"
    >
      {/* Image container with zoom & overlay */}
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-900">
        <img
          src={photoUrl}
          alt={person.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-card via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Department Badge */}
        {person.known_for_department && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-cinema-gold rounded-full border border-cinema-gold/20">
            {person.known_for_department}
          </span>
        )}
      </div>

      {/* Info Section */}
      <div className="p-3">
        <p className="text-sm text-cinema-text font-semibold truncate group-hover:text-cinema-gold transition-colors duration-200">
          {person.name}
        </p>
        {knownFor ? (
          <p className="text-xs text-cinema-muted truncate mt-0.5" title={knownFor}>
            {knownFor}
          </p>
        ) : (
          <p className="text-xs text-cinema-muted/60 italic mt-0.5">Known works N/A</p>
        )}
      </div>
    </Link>
  )
}

export default CelebrityCard