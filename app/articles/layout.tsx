import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articles | Doan Dinh Dang',
  description: "Dang's Articles"
}

export default function ArticlesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
