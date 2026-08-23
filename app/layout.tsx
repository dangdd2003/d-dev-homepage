import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ColorModeScript } from '@chakra-ui/react'

import { Providers } from './providers'
import { ClientLayout } from './client-layout'
import { mPlusRounded1c } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Doan Dinh Dang | Homepage',
  description: "Doan Dinh Dang's Homepage",
  authors: [
    { name: 'Doan Dinh Dang' },
    { name: 'Đoàn Đình Đăng' },
    { name: 'Đ-Dev' }
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Doan Dinh Dang',
  alternateName: ['Đoàn Đình Đăng', 'Đ-Dev'],
  url: 'https://www.dangdd.dev',
  image: 'https://www.dangdd.dev/avatars/avatar.jpg',
  sameAs: [
    'https://github.com/dangdd2003',
    'https://www.linkedin.com/in/dangdd2003/'
  ],
  jobTitle: 'System & Cloud Engineer'
}

export default async function RootLayout({
  children
}: {
  children: ReactNode
}) {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${mPlusRounded1c.className} ${mPlusRounded1c.variable}`}
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ColorModeScript initialColorMode="system" type="cookie" />
        <Providers cookies={cookieString}>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  )
}
