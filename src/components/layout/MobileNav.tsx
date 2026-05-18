import React from 'react';
import { NavLink } from 'react-router-dom';

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 pt-3 pb-6 md:pb-3 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] safe-area-bottom">
      <NavLink 
        to="/home" 
        className={({ isActive }) => 
          `flex-1 flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary-600' : 'text-slate-400'}`
        }
      >
        <i className="fas fa-home text-xl"></i>
        <span className="text-[10px] font-semibold uppercase tracking-wider">Home</span>
      </NavLink>
      <NavLink 
        to="/appointments" 
        className={({ isActive }) => 
          `flex-1 flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary-600' : 'text-slate-400'}`
        }
      >
        <i className="fas fa-calendar-alt text-xl"></i>
        <span className="text-[10px] font-semibold uppercase tracking-wider">Bookings</span>
      </NavLink>
      <NavLink 
        to="/profile" 
        className={({ isActive }) => 
          `flex-1 flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary-600' : 'text-slate-400'}`
        }
      >
        <i className="fas fa-user text-xl"></i>
        <span className="text-[10px] font-semibold uppercase tracking-wider">Profile</span>
      </NavLink>
    </nav>
  );
};

export default MobileNav;
