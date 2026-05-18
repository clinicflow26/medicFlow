import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const DesktopHeader = () => {
  const navigate = useNavigate();
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  return (
    <header className="hidden md:flex bg-white border-b border-slate-100 sticky top-0 z-50 px-8 py-4 justify-between items-center shadow-sm">
      <div className="flex items-center gap-12">
        <NavLink to="/home" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-200">
            <i className="fas fa-plus"></i>
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tighter">
            Clinic<span className="text-primary-600">Flow</span>
          </span>
        </NavLink>

        <div className="relative">
          <button
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
          >
            <i className="fas fa-location-dot text-primary-600"></i>
            <span className="text-sm font-bold text-slate-700">
              Andheri West, Mumbai
            </span>
            <i
              className={`fas fa-chevron-down text-[10px] text-slate-400 transition-transform ${isLocationOpen ? "rotate-180" : ""}`}
            ></i>
          </button>

          <AnimatePresence>
            {isLocationOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 ring-1 ring-slate-200/50"
              >
                <div className="relative mb-4">
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input
                    className="w-full bg-slate-50 p-2.5 pl-9 rounded-lg text-xs font-medium outline-none border border-slate-100 focus:bg-white focus:ring-2 focus:ring-primary-500/10 transition-all"
                    placeholder="Search location..."
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2 mb-2">
                    Recent Searches
                  </p>
                  {["Andheri West", "Bandra", "Powai"].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setIsLocationOpen(false)}
                      className="w-full text-left p-2.5 hover:bg-slate-50 rounded-lg flex items-center gap-3 group transition-colors"
                    >
                      <i className="fas fa-clock-rotate-left text-slate-300 group-hover:text-primary-600"></i>
                      <span className="text-xs font-bold text-slate-700">
                        {loc}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 max-w-xl px-12">
        <div className="relative group">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600"></i>
          <input
            type="text"
            className="w-full bg-slate-50 border-transparent border p-3 pl-12 rounded-2xl outline-none focus:bg-white focus:border-primary-100 focus:ring-4 focus:ring-primary-500/5 text-sm font-medium transition-all"
            placeholder="Search doctors, specialities, or symptoms..."
            onClick={() => navigate("/search")}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-8 mr-4">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `text-sm font-bold ${isActive ? "text-primary-600" : "text-slate-500 hover:text-primary-600"} transition-colors`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              `text-sm font-bold ${isActive ? "text-primary-600" : "text-slate-500 hover:text-primary-600"} transition-colors`
            }
          >
            Bookings
          </NavLink>
        </nav>

        <button className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors relative active:scale-95">
          <i className="fas fa-bell"></i>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div
          className="flex items-center gap-3 pl-6 border-l border-slate-100 cursor-pointer group"
          onClick={() => navigate("/profile")}
        >
          <div className="w-10 h-10 bg-slate-200 rounded-xl overflow-hidden group-hover:ring-2 ring-primary-500 transition-all">
            <img src="https://i.pravatar.cc/150?u=9" alt="profile" />
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors leading-none">
              Alex Johnson
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
              Patient
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
