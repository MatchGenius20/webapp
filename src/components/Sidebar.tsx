'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface SidebarProps {
  selected: string;
  onSelect: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-20 p-2  text-black rounded"
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
        <ul className="pt-16">
          <li
            className={`p-4 cursor-pointer mb-2 ${selected === 'ProfileSettings' ? 'bg-[#453EF1] text-white rounded-lg' : 'text-black'}`}
            onClick={() => {
              onSelect('ProfileSettings')
              if (window.innerWidth <= 768) toggleSidebar()
            }}
          >
            Profile Settings
          </li>
          <li
            className={`p-4 cursor-pointer mb-2 ${selected === 'PaymentsWallets' ? 'bg-[#453EF1] text-white rounded-lg' : 'text-black'}`}
            onClick={() => {
              onSelect('PaymentsWallets')
              if (window.innerWidth <= 768) toggleSidebar()
            }}
          >
            Payments & Wallets
          </li>
          <li
            className={`p-4 cursor-pointer mb-2 ${selected === 'ScheduledSessions' ? 'bg-[#453EF1] text-white rounded-lg' : 'text-black'}`}
            onClick={() => {
              onSelect('ScheduledSessions')
              if (window.innerWidth <= 768) toggleSidebar()
            }}
          >
            Scheduled Sessions
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar