// The purpose of the ScrollToTop component is to automatically scroll the window to the top whenever the route changes (i.e., whenever the URL's pathname changes). This is useful for single-page applications (SPAs) where navigating to a new route should reset the scroll position to the top of the page, providing a better user experience.\

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default ScrollToTop
