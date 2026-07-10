'use client'

import { Box, Container } from '@chakra-ui/react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import dynamic from 'next/dynamic'
import EarthLoader from '@/components/earth-loader'
import { usePathname } from 'next/navigation'

const Earth = dynamic(() => import('@/components/earth'), {
  ssr: false,
  loading: () => <EarthLoader />
})

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname() || ''

  return (
    <Box as="main" pb={8}>
      <Navbar path={path} />
      <Container maxW="container.md" pt={14}>
        <Earth />
        {children}
        <Footer />
      </Container>
    </Box>
  )
}
