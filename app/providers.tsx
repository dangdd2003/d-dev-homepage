'use client'

import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager
} from '@chakra-ui/react'
import theme from '@/lib/theme'
import { MotionConfig, LazyMotion } from 'framer-motion'

const loadFeatures = () =>
  import('@/lib/framer-features').then(res => res.default)

export function Providers({
  children,
  cookies
}: {
  children: React.ReactNode
  cookies?: string
}) {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager

  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig reducedMotion="user">
        <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
          {children}
        </ChakraProvider>
      </MotionConfig>
    </LazyMotion>
  )
}
