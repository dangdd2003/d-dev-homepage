'use client'

import { Box, Container } from '@chakra-ui/react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import LazyEarth from '@/components/lazy-earth'
import { usePathname } from 'next/navigation'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname() || ''

  return (
    <Box as="main" pb={8}>
      <Navbar path={path} />
      <Container maxW="container.md" pt={14}>
        <LazyEarth />
        {children}
        <Footer />
      </Container>
    </Box>
  )
}
