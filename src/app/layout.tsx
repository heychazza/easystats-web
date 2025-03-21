import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EasyStats Visualizer',
  description: 'Visualize your Minecraft server statistics with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="noise" />
        <main className="relative min-h-screen z-10">
          {children}
        </main>
      </body>
    </html>
  )
} 