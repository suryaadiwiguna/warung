import type { Metadata } from 'next'
// import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Warungs',
  description: 'Created by Idrus & Surya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
