import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { SPECIALISTS } from '../constants';

const CategoriesScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'physical';

  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-white p-5 sticky top-0 z-40 border-b border-slate-100 shadow-sm flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 active:scale-95 transition-all"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-lg font-black text-slate-900 tracking-tight">Categories</h2>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="text-[11px] font-black text-primary-600 uppercase tracking-widest mb-1">
            {type === 'video' ? 'Online Consultation' : 'Physical Appointment'}
          </p>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Select Specialty</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {SPECIALISTS.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => navigate(`/search?category=${category.name.toLowerCase()}&type=${type}`)}
              className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/5 transition-all text-center cursor-pointer group active:scale-95 overflow-hidden relative"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all shadow-inner">
                <i className={`fas ${category.icon} text-2xl`}></i>
              </div>
              <span className="text-[13px] font-extrabold text-slate-700 group-hover:text-primary-600 transition-colors block leading-tight">
                {category.name}
              </span>
              
              {/* Subtle background decoration */}
              <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-slate-50 rounded-full opacity-50 group-hover:bg-primary-50 transition-colors"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesScreen;
