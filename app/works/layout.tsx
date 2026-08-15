import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Works | Doan Dinh Dang',
  description: "Dang's Works"
}

export default function WorksLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
