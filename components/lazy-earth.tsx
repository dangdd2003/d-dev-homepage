'use client'

import dynamic from 'next/dynamic'
import EarthLoader from '@/components/earth-loader'

const Earth = dynamic(() => import('@/components/earth'), {
  ssr: false,
  loading: () => <EarthLoader />
})

export default function LazyEarth() {
  return <Earth />
}
