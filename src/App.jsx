function App() {
  return (
    <div className="min-h-screen bg-cinema-bg text-white flex flex-col items-center justify-center gap-4">
      <h1 className="font-display text-6xl tracking-wide text-cinema-gold">
        CINEMA APP
      </h1>
      <p className="text-cinema-muted">Powered by Tailwind v4 design tokens</p>
      <button className="bg-cinema-red hover:bg-cinema-red-hover transition-colors px-6 py-2 rounded-full font-semibold">
        Watch Now
      </button>
    </div>
  )
}

export default App