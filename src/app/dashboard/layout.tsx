'use client'
import React, { useState, ReactNode } from 'react';
import Sidebar from '../../components/Sidebar';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [selectedComponent, setSelectedComponent] = useState('ProfileSettings');

  return (
    <div className="flex h-screen">
      <Sidebar selected={selectedComponent} onSelect={setSelectedComponent} />
      <div className="flex-1 p-8 bg-white">
        {children}
      </div>
    </div>
  );
};

export default Layout;
