'use client'
import React from 'react'
import SidebarCoach from '../../components/SidebarCoach'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/layout'

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
      <Navbar />
      <div className="flex md:flex-row flex-col h-screen">
        <SidebarCoach selected={getSelectedComponent()} />
        <div className="flex-1 p-8 bg-white">{children}</div>
      </div>
      <Footer />
    </>
  )
}

export default Layout
