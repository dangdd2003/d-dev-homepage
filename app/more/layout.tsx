import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'More about me | Doan Dinh Dang',
  description: 'More about Dang'
}

export default function MoreLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
