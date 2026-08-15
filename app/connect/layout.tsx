import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Connect | Doan Dinh Dang',
  description: 'Connect with Dang'
}

export default function ConnectLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
