'use client'
import React from 'react'
import Sidebar from '../../components/Sidebar'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()

  const getSelectedComponent = () => {
    if (pathname?.includes('profilesettings')) return 'ProfileSettings'
    if (pathname?.includes('payments&wallets')) return 'PaymentsWallets'
    if (pathname?.includes('scheduleSession')) return 'ScheduleSession'
    return 'ProfileSettings'
  }

  return (
    <>
      <div className="flex md:flex-row flex-col h-screen">
        <Sidebar selected={getSelectedComponent()} />
        <div className="flex-1 p-8 bg-white">{children}</div>
      </div>
    </>
  )
}

export default Layout
