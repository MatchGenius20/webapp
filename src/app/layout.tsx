import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import React from 'react'
import { Footer, Header } from '@/components/layout'

const roboto = Inter({ style: 'normal', weight: '400', subsets: ['latin'] })

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
        <link rel="icon" type="image/png" href="../../public/logo/logo5.png" />
      </head>
      <body className={roboto.className}>
      
        {children}
        
      </body>
    </html>
  )
}
