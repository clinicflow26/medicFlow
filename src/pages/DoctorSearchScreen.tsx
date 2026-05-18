import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTORS } from '../constants';

const DoctorSearchScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialType = searchParams.get('type') || 'physical';
  const [searchQuery, setSearchQuery] = useState(initialCategory);
  const [activeTab, setActiveTab] = useState(initialType);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredDoctors = DOCTORS.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.about.toLowerCase().includes(searchQuery.toLowerCase());
    
    // For demo purposes, we alternate availability if we don't have a flag
    // In a real app, this would be d.isOnline or d.availablePhysically
    const numId = parseInt(d.id, 10);
    const matchesTab = activeTab === 'video' ? numId % 2 === 0 : numId % 2 !== 0;
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Search Header */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 border-b border-slate-100 ${isScrolled ? 'py-3' : 'p-4 md:p-6 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className={`bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 active:scale-95 transition-all flex-shrink-0 ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}`}
            >
              <i className={`fas fa-arrow-left ${isScrolled ? 'text-sm' : 'text-base'}`}></i>
            </button>
            
            <div className={`flex-1 relative group cursor-pointer transition-all ${isScrolled ? 'max-w-md mx-auto' : ''}`}>
              <i className={`fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors ${isScrolled ? 'text-xs' : 'text-sm'}`}></i>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-slate-100 rounded-2xl outline-none ring-primary-500/20 focus:ring-4 focus:bg-white transition-all font-bold placeholder:font-medium truncate ${isScrolled ? 'p-2 pl-10 text-[11px]' : 'p-3.5 pl-11 text-[13px]'}`} 
                placeholder={`${initialCategory || 'Doctors'} in Andheri West`} 
              />
            </div>
            
            {isScrolled && (
              <button className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center text-xs active:scale-95 transition-all">
                <i className="fas fa-sliders-h"></i>
              </button>
            )}
          </div>

          <AnimatePresence>
            {!isScrolled && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex items-center gap-2">
                  <button 
                    onClick={() => navigate('/select-location')}
                    className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl active:scale-95 transition-all text-left font-sans"
                  >
                    <i className="fas fa-location-dot text-[9px] text-primary-600"></i>
                    <span className="text-[10px] font-bold text-slate-700">Andheri West</span>
                    <i className="fas fa-chevron-down text-[7px] text-slate-300"></i>
                  </button>
                  
                  <div className="h-5 w-px bg-slate-200 mx-1"></div>
                  
                  <div className="flex-1 overflow-x-auto no-scrollbar flex gap-2">
                    {['Rating 4+', 'Today', '< $50'].map(filter => (
                      <button key={filter} className="whitespace-nowrap px-2.5 py-2 bg-slate-50 text-[10px] font-bold text-slate-500 rounded-xl border border-slate-100">
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Tabs System */}
      <div className="sticky top-[58px] md:top-[82px] z-40 bg-slate-50/80 backdrop-blur-md px-5 py-3 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex bg-white p-1 rounded-xl shadow-sm border border-slate-100">
          <button 
            onClick={() => setActiveTab('physical')}
            className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'physical' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-400'}`}
          >
            <i className="fas fa-hospital-user mr-2"></i>
            Physical Appointment
          </button>
          <button 
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'video' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400'}`}
          >
            <i className="fas fa-video mr-2"></i>
            Video Consult
          </button>
        </div>
      </div>

      <div className="p-5 md:pt-10 max-w-7xl mx-auto flex gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-72 h-fit bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-32">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-bold text-slate-900">Filters</h4>
            <button className="text-[10px] font-bold text-primary-600 uppercase tracking-widest hover:underline">Clear All</button>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Availability</p>
              <div className="space-y-3">
                {['Available Today', 'Available Tomorrow', 'Available this Weekend'].map(opt => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-primary-600 focus:ring-primary-500 cursor-pointer" />
                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Consultation Fee</p>
              <div className="space-y-3">
                {['Free', '$1 - $50', '$51 - $100', '$100+'].map(opt => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="fee" className="w-5 h-5 border-slate-200 text-primary-600 focus:ring-primary-500 cursor-pointer" />
                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Experience</p>
              <div className="space-y-3">
                {['5+ Years', '10+ Years', '15+ Years'].map(opt => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-primary-600 focus:ring-primary-500 cursor-pointer" />
                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-black text-lg md:text-2xl text-slate-900 tracking-tight">
                {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Expert' : 'Experts'} Available
              </h4>
              <p className="text-[11px] md:text-sm text-slate-400 font-bold uppercase tracking-tight">
                {initialCategory || 'Top Rated'} Specialist in Andheri West
              </p>
            </div>
            <button className="lg:hidden flex items-center gap-2 text-primary-600 text-[10px] font-black bg-white px-4 py-2 rounded-xl active:scale-95 transition-all border border-primary-100 shadow-sm uppercase tracking-widest">
              <i className="fas fa-sliders-h"></i>
              Filter
            </button>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 pb-20">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, index) => (
                <motion.div 
                  key={doctor.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/doctor/${doctor.id}`)}
                  className="bg-white p-4 md:p-6 rounded-2xl md:rounded-[3rem] shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-100 flex gap-4 md:gap-6 cursor-pointer active:scale-[0.99] group transition-all hover:shadow-xl hover:shadow-primary-600/5 hover:border-primary-100"
                >
                  <div className="relative w-20 h-20 md:w-32 md:h-32 bg-slate-50 rounded-2xl md:rounded-[2rem] overflow-hidden shrink-0 border border-slate-100">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {activeTab === 'video' && (
                      <div className="absolute top-1.5 left-1.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div className="min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="min-w-0">
                          <h5 className="font-black text-base md:text-xl text-slate-900 truncate tracking-tight">{doctor.name}</h5>
                          <p className="text-[10px] md:text-xs text-primary-600 font-black uppercase tracking-widest opacity-80 truncate">{doctor.specialization}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded-lg border border-yellow-100 flex-shrink-0">
                          <i className="fas fa-star text-yellow-500 text-[8px]"></i>
                          <span className="text-[10px] md:text-xs font-black text-yellow-800">{doctor.rating}</span>
                        </div>
                      </div>
                      
                      {activeTab === 'physical' ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <i className="fas fa-hospital text-[10px] flex-shrink-0"></i>
                            <p className="text-[10px] md:text-[11px] font-bold truncate leading-none tracking-tight">{doctor.clinic || 'City Health Center'}</p>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <i className="far fa-clock text-[9px] flex-shrink-0"></i>
                            <p className="text-[9px] md:text-[10px] font-medium opacity-70">Mon - Sat | 10:00 AM - 06:00 PM</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-green-600">
                            <i className="fas fa-video text-[10px] flex-shrink-0"></i>
                            <p className="text-[10px] md:text-[11px] font-black truncate uppercase tracking-widest">Available Now</p>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <i className="fas fa-bolt text-[9px] text-amber-500 flex-shrink-0"></i>
                            <p className="text-[9px] md:text-[10px] font-medium opacity-70 italic">Starting in 5 min</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between gap-3 mt-1 pt-3 border-t border-slate-50">
                      <div className="flex flex-col">
                        <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">
                          {activeTab === 'physical' ? 'Consult Fee' : 'Waiting Time'}
                        </p>
                        <p className={`text-[13px] md:text-lg font-black leading-none ${activeTab === 'video' ? 'text-primary-600' : 'text-slate-900'}`}>
                          {activeTab === 'physical' ? '$50.00' : 'Est. 5 Min'}
                        </p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/appointments?tab=form&doctorId=${doctor.id}&type=${activeTab}`);
                        }}
                        className={`px-4 py-2.5 md:px-8 md:py-3.5 text-white rounded-lg md:rounded-2xl text-[10px] md:text-xs font-black shadow-lg active:scale-95 transition-all uppercase tracking-widest ${activeTab === 'video' ? 'bg-blue-600 shadow-blue-200 hover:bg-blue-700' : 'bg-primary-600 shadow-primary-200 hover:bg-primary-700'}`}
                      >
                        {activeTab === 'physical' ? 'Book Appointment' : 'Join Call'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4 bg-white rounded-[3rem] border border-slate-100 shadow-sm col-span-full">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                  <i className="fas fa-user-doctor text-4xl"></i>
                </div>
                <h5 className="font-bold text-slate-900 text-lg">No doctors found</h5>
                <p className="text-slate-400 text-sm max-w-[240px] mx-auto italic">Try searching for other doctors or adjust your filters.</p>
                <button onClick={() => setSearchQuery('')} className="bg-primary-50 text-primary-600 px-6 py-2 rounded-xl text-xs font-bold border border-primary-100 transition-colors hover:bg-primary-100">Reset Search</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSearchScreen;
