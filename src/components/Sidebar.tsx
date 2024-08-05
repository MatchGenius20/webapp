'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  selected: string;
}

const Sidebar: React.FC<SidebarProps> = ({ selected }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const linkClass = (path: string) => 
    `block px-6 py-3 cursor-pointer ${pathname === path ? 'bg-[#453EF1] text-white rounded-lg' : 'text-black hover:bg-[#F0F0F0] rounded-lg'}`

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-20 p-2 text-black rounded"
        onClick={toggleSidebar}
      >
        {isOpen ? '✕' : '☰'}
      </button>
      <div className={`fixed md:relative w-64 bg-[#FFFFFF] border-r-2 border-[#B2AFF8] h-screen p-4 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-10`}>
        <div className="absolute top-0 left-0 right-0 bg-[#EDECFF] p-4">
          <h1 className="text-xl font-bold text-[#443EDE]">
            <Link href={'/'}>DebatesMatch</Link>
          </h1>
        </div>
        <ul className="pt-20 space-y-4"> {/* Adjusted spacing */}
          <li> 
            <Link href="/dashboard/profilesettings" className={linkClass('/dashboard/profilesettings')} onClick={() => { if (window.innerWidth <= 768) toggleSidebar() }}>
              Profile Settings
            </Link>
          </li>
          <li>
            <Link href="/dashboard/payments&wallets" className={linkClass('/dashboard/payments&wallets')} onClick={() => { if (window.innerWidth <= 768) toggleSidebar() }}>
              Payments & Wallets
            </Link>
          </li>
          <li>
            <Link href="/dashboard/scheduleSession" className={linkClass('/dashboard/scheduleSession')} onClick={() => { if (window.innerWidth <= 768) toggleSidebar() }}>
              Scheduled Sessions
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
