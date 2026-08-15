'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import EarthLoader from '@/components/earth-loader'

const Earth = dynamic(() => import('@/components/earth'), {
  ssr: false,
  loading: () => <EarthLoader />
})

export default function LazyEarth() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setShouldRender(true))
      return () => {
        if (typeof window.cancelIdleCallback === 'function') {
          window.cancelIdleCallback(id)
        }
      }
    }

    // Fallback for Safari and older browsers (200ms delay)
    const timeoutId = window.setTimeout(() => setShouldRender(true), 200)
    return () => window.clearTimeout(timeoutId)
  }, [])

  if (!shouldRender) {
    return <EarthLoader />
  }

  return <Earth />
}
