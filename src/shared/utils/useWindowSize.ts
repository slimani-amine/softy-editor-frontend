import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
}

export const useWindowSize = (): WindowSize => {
  const isClient = typeof window === 'object'

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  })

  const handleResize = () => {
    setWindowSize({
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    })
  }

  useEffect(() => {
    if (!isClient) {
      return // Don't run on the server
    }

    // Set initial window size
    handleResize()

    // Add event listener to update window size when it changes
    window.addEventListener('resize', handleResize)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isClient])

  return windowSize
}
