'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  selected: string
}

const Sidebar: React.FC<SidebarProps> = ({ selected }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
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
    `block px-4 py-2 lg:px-6 lg:py-3 cursor-pointer ${
      pathname === path
        ? 'bg-[#453EF1] text-white rounded-lg'
        : 'text-black hover:bg-[#F0F0F0] rounded-lg'
    }`

  return (
    <>
      {!isOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 z-20 p-2 text-black rounded focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
      <div
        className={`
          fixed lg:relative w-full sm:w-64 bg-[#FFFFFF] border-r-2 border-[#B2AFF8] 
          h-screen p-2 sm:p-4 transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 z-10
        `}
      >
        <div className="absolute top-0 left-0 right-0 bg-[#EDECFF] p-2 sm:p-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-bold text-[#443EDE]">
            <Link href={'/'}>DebatesMatch</Link>
          </h1>
          {isOpen && (
            <button
              className="lg:hidden p-2 text-black rounded focus:outline-none"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <ul className="pt-16 sm:pt-20 space-y-2 sm:space-y-4">
          <li>
            <Link
              href="/dashboard/profilesettings"
              className={linkClass('/dashboard/profilesettings')}
              onClick={() => {
                if (window.innerWidth < 1024) toggleSidebar()
              }}
            >
              Profile Settings
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/payments&wallets"
              className={linkClass('/dashboard/payments&wallets')}
              onClick={() => {
                if (window.innerWidth < 1024) toggleSidebar()
              }}
            >
              Payments & Wallets
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/scheduleSession"
              className={linkClass('/dashboard/scheduleSession')}
              onClick={() => {
                if (window.innerWidth < 1024) toggleSidebar()
              }}
            >
              Scheduled Sessions
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar
