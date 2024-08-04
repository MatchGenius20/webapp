'use client'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import dynamic from 'next/dynamic'

const PaymentsWallets = dynamic(() => import('./payments&wallets/page'))
const ProfileSettings = dynamic(() => import('./profile/page'))
const Layout: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState('ProfileSettings')

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'ProfileSettings':
        return <ProfileSettings />
      case 'PaymentsWallets':
        return <PaymentsWallets />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar selected={selectedComponent} onSelect={setSelectedComponent} />
      <div className="flex-1 p-8 bg-white">{renderComponent()}</div>
    </div>
  )
}

export default Layout
