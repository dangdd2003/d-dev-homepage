'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import EarthLoader from '@/components/earth-loader'

const Earth = dynamic(() => import('@/components/earth'), {
  ssr: false,
  loading: () => <EarthLoader />
})

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void) => number
  cancelIdleCallback?: (id: number) => void
}

export default function LazyEarth() {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const w = window as IdleWindow

    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(() => setShouldRender(true))
      return () => {
        if (w.cancelIdleCallback) w.cancelIdleCallback(id)
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
