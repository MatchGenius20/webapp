import React from 'react';
import Navbar from '../../components/Navbar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div >
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;