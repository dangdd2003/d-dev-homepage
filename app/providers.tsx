'use client'

import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager
} from '@chakra-ui/react'
import theme from '@/lib/theme'
import { MotionConfig } from 'framer-motion'

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
    <MotionConfig reducedMotion="user">
      <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
        {children}
      </ChakraProvider>
    </MotionConfig>
  )
}
