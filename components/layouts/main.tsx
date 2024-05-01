import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import Navbar from '@/components/navbar'
import type { NextRouter } from 'next/router'
import Footer from '@/components/footer'
import EarthLoader from '@/components/earth-loader'
import dynamic from 'next/dynamic'

const Earth = dynamic(() => import('@/components/earth'), {
  ssr: false,
  loading: () => <EarthLoader />
})

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
        <meta name="description" content="Doan Dinh Dang's Homepage" />
        <meta name="author" content="Doan Dinh Dang" />
        <meta name="author" content="Đoàn Đình Đăng" />
        <meta name="author" content="d-dev" />

        <meta property="og:url" content="https://www.dangdd.id.vn" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Doan Dinh Dang | Homepage" />
        <meta property="og:description" content="Dang's Homepage" />
        <meta property="og:image" content="" />
        <meta property="og:site_name" content="Doan Dinh Dang" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="dangdd.id.vn" />
        <meta property="twitter:url" content="https://www.dangdd.id.vn" />
        <meta property="twitter:url" content="https://www.dangdd.id.vn" />
        <meta name="twitter:title" content="Doan Dinh Dang | Homepage" />
        <meta name="twitter:description" content="Dang's Homepage" />
        <meta name="twitter:image" content="" />
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
        <title>Doan Dinh Dang | Homepage</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <Earth />
        {children}
        <Footer />
      </Container>
    </Box>
  )
}
