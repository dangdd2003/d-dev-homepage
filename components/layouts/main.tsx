import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import Navbar from '@/components/navbar'
import type { NextRouter } from 'next/router'
import Footer from '@/components/footer'

export default function Main({
  children,
  router
}: {
  children?: React.ReactNode
  router: NextRouter
}) {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Dang's Homepage" />
        <meta name="author" content="Doan Dinh Dang" />
        <meta name="author" content="D-Dev" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <title>D-Dev | Homepage</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        {children}
      </Container>
      <Footer />
    </Box>
  )
}
