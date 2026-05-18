import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const RECENT_SEARCHES = [
  { area: 'Andheri West', city: 'Mumbai' },
  { area: 'Bandra', city: 'Mumbai' },
  { area: 'Powai', city: 'Mumbai' },
];

const SelectLocationScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-xl bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col">
        <header className="flex items-center justify-between mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Select Location</h2>
          <div className="w-10"></div>
        </header>

        <div className="relative mb-8">
          <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            autoFocus
            className="w-full bg-slate-50 p-5 pl-14 rounded-2xl outline-none ring-primary-500/10 focus:ring-4 focus:bg-white border border-slate-100 transition-all text-sm font-bold placeholder:font-medium shadow-inner" 
            placeholder="Enter area, city or zip code..." 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-4 p-5 bg-primary-50/30 hover:bg-primary-50 rounded-2xl transition-colors group border border-primary-100/50"
          >
            <div className="w-11 h-11 bg-primary-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary-200 group-hover:scale-105 transition-transform">
              <i className="fas fa-location-crosshairs"></i>
            </div>
            <div className="text-left">
              <p className="font-black text-primary-900 text-sm">Near Me</p>
              <p className="text-[10px] text-primary-600 font-bold uppercase tracking-wider">Current Location</p>
            </div>
          </button>

          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-4 p-5 hover:bg-slate-50 rounded-2xl transition-colors group border border-slate-100"
          >
            <div className="w-11 h-11 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <i className="fas fa-city"></i>
            </div>
            <div className="text-left">
               <p className="font-black text-slate-800 text-sm">Entire City</p>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mumbai City</p>
            </div>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4 mb-6">Recently Visited Sites</h4>
          <div className="space-y-2">
            {RECENT_SEARCHES.map((item, index) => (
              <motion.button 
                key={item.area}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(-1)}
                className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-slate-50 rounded-2xl transition-all group text-left border border-transparent hover:border-slate-100 min-w-0"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-primary-600 group-hover:bg-primary-50 transition-colors shrink-0">
                    <i className="fas fa-clock-rotate-left text-sm md:text-base"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-800 text-sm truncate">{item.area}</p>
                    <p className="text-[10px] md:text-xs text-slate-400 font-medium truncate">{item.city}</p>
                  </div>
                </div>
                <i className="fas fa-chevron-right text-slate-200 text-[10px] group-hover:translate-x-1 transition-transform group-hover:text-primary-600 ml-2"></i>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectLocationScreen;
