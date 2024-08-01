import Link from 'next/link'
import React from 'react'
import { SidebarProps } from '../../type'

const Sidebar: React.FC<SidebarProps> = ({ selected, onSelect }) => {
  return (
    <div className="w-64 bg-[#FFFFFF] border-r-2 border-[#B2AFF8] h-screen p-4">
      <h1 className="text-xl font-bold mb-8 text-[#443EDE]">
        <Link href={'/'}>DebatesMatch</Link>
      </h1>
      <ul>
        <li
          className={`p-4  cursor-pointer mb-2 ${selected === 'ProfileSettings' ? 'bg-[#453EF1] text-white rounded-lg' : 'text-black'}`}
          onClick={() => onSelect('ProfileSettings')}
        >
          Profile Settings
        </li>
        <li
          className={`p-4 cursor-pointer mb-2 ${selected === 'PaymentsWallets' ? 'bg-[#453EF1] text-white rounded-lg' : 'text-black'}`}
          onClick={() => onSelect('PaymentsWallets')}
        >
          Payments & Wallets
        </li>
        <li
          className={`p-4 cursor-pointer mb-2 ${selected === 'ScheduledSessions' ? 'bg-[#453EF1] text-white rounded-lg' : 'text-black'}`}
          onClick={() => onSelect('ScheduledSessions')}
        >
          Scheduled Sessions
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
