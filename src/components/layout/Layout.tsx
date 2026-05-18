import React from 'react';
import MobileNav from './MobileNav';
import DesktopHeader from './DesktopHeader';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideNavPaths = ['/', '/login', '/register', '/forgot-password', '/select-location'];
  const isDoctorProfile = location.pathname.startsWith('/doctor/');
  const shouldShowNav = !hideNavPaths.includes(location.pathname) && !isDoctorProfile;

  return (
    <div className="bg-slate-50 min-h-screen relative flex flex-col font-sans">
      {shouldShowNav && <DesktopHeader />}
      
      <main className={`flex-1 ${shouldShowNav ? 'pb-24 md:pb-0' : ''}`}>
        <div className={shouldShowNav ? 'max-w-7xl mx-auto w-full md:px-8' : ''}>
          <div className={shouldShowNav ? 'max-w-md mx-auto w-full md:max-w-none' : ''}>
            {children}
          </div>
        </div>
      </main>

      <div className="md:hidden">
        {shouldShowNav && <MobileNav />}
      </div>
    </div>
  );
};

export default Layout;
