import { Providers } from './providers'
import { ClientLayout } from './client-layout'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Doan Dinh Dang | Homepage',
  description: "Doan Dinh Dang's Homepage",
  authors: [
    { name: 'Doan Dinh Dang' },
    { name: 'Đoàn Đình Đăng' },
    { name: 'd-dev' }
  ],
  metadataBase: new URL('https://www.dangdd.dev'),
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Doan Dinh Dang | Homepage',
    description: "Dang's Homepage",
    siteName: 'Doan Dinh Dang',
    images: [{ url: '/homepage.png' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doan Dinh Dang | Homepage',
    description: "Dang's Homepage",
    images: ['/homepage.png']
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest'
}

import { ColorModeScript } from '@chakra-ui/react'
import { cookies } from 'next/headers'

import { mPlusRounded1c } from '@/lib/fonts'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${mPlusRounded1c.className} ${mPlusRounded1c.variable}`}
    >
      <head></head>
      <body suppressHydrationWarning>
        <ColorModeScript initialColorMode="system" type="cookie" />
        <Providers cookies={cookieString}>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  )
}
