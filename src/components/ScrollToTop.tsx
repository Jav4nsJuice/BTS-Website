import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, search } = useLocation()

  // useLayoutEffect ensures the scroll reset happens synchronously 
  // before the browser paints the new route content to prevent flickering.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, search])

  return null
}

export default ScrollToTop