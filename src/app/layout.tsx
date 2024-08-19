import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import React from 'react'
import { UserProvider } from '@/context/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DebatesMatch',
  description: 'Providing end to end Debate Solutions',
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logo/logo5.png" />
      </head>
<<<<<<< HEAD
      <body className={`${inter.className} bg-secondary`}>{children}</body>
=======
      <body className={`${inter.className} bg-[#fafafc]`}>
        <UserProvider>{children}</UserProvider>
      </body>
>>>>>>> b31e12ab8f65061917d9c55c291ce5916a52654a
    </html>
  )
}
