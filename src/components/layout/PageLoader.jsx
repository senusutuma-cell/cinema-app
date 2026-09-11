import { useEffect, useState } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

function PageLoader() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 400)
    return () => clearTimeout(timer)
  }, [location.pathname])

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-100 h-1 bg-cinema-surface overflow-hidden">
      <div className="h-full bg-cinema-gold animate-pulse w-full origin-left" />
    </div>
  )
}

export default PageLoader