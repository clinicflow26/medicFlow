import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTORS } from '../constants';

const DoctorProfileScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = DOCTORS.find(d => d.id === id);
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');

  if (!doctor) return <div className="p-10 text-center">Doctor not found</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <div className="max-w-7xl mx-auto md:p-8 lg:p-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image & Call to Action (Desktop) */}
          <div className="relative group md:sticky md:top-32">
            <div className="relative h-96 md:h-[600px] overflow-hidden md:rounded-[3.5rem] shadow-2xl">
              <img 
                src={doctor.image} 
                alt={doctor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
              
              <button 
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 w-11 h-11 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl text-slate-900 active:scale-90 transition-all z-20"
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <button 
                className="absolute top-6 right-6 w-11 h-11 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl text-red-500 active:scale-90 transition-all z-20"
              >
                <i className="far fa-heart text-lg"></i>
              </button>
            </div>
            
            <div className="hidden md:block mt-8 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Consultation Fee</p>
                  <p className="text-2xl font-black text-slate-900">$50.00 <span className="text-sm font-medium text-slate-400">/ Session</span></p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl text-xs font-bold ring-1 ring-green-100">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Available Now
                </div>
              </div>
              <button 
                onClick={() => navigate(`/appointments?tab=form&doctorId=${doctor.id}`)}
                className="w-full bg-primary-600 text-white py-5 rounded-[2rem] font-bold shadow-xl shadow-primary-200 active:scale-95 transition-all text-lg"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Right Column: Details */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 md:px-0 -mt-12 md:mt-0 relative z-30"
          >
            <div className="bg-white rounded-t-[3rem] md:rounded-[3rem] p-8 md:p-12 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:shadow-sm border-t md:border border-slate-100">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight">{doctor.name}</h2>
                  <p className="text-primary-600 md:text-lg font-bold mt-2 uppercase tracking-wide">{doctor.specialization} Specialist</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-8 md:mb-10">
                <div className="flex-1 bg-white p-3 md:p-6 rounded-2xl md:rounded-[2rem] text-center border border-slate-100 shadow-sm">
                  <p className="text-[9px] md:text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Exp.</p>
                  <p className="text-base md:text-lg font-black text-slate-900 leading-tight">{doctor.experience}</p>
                </div>
                <div className="flex-1 bg-white p-3 md:p-6 rounded-2xl md:rounded-[2rem] text-center border border-slate-100 shadow-sm">
                  <p className="text-[9px] md:text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Patients</p>
                  <p className="text-base md:text-lg font-black text-slate-900 leading-tight">{doctor.patients}</p>
                </div>
                <div className="flex-1 bg-white p-3 md:p-6 rounded-2xl md:rounded-[2rem] text-center border border-slate-100 shadow-sm">
                  <p className="text-[9px] md:text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Rating</p>
                  <p className="text-base md:text-lg font-black text-slate-900 leading-tight">{doctor.rating}</p>
                </div>
              </div>

              <div className="flex border-b border-slate-100 mb-10 p-1.5 bg-slate-50 rounded-[2rem]">
                <button 
                  onClick={() => setActiveTab('about')}
                  className={`flex-1 py-4 rounded-[1.5rem] text-sm font-bold transition-all ${activeTab === 'about' ? 'bg-white shadow-lg text-primary-600' : 'text-slate-500'}`}
                >
                  Doctor Profile
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-4 rounded-[1.5rem] text-sm font-bold transition-all ${activeTab === 'reviews' ? 'bg-white shadow-lg text-primary-600' : 'text-slate-500'}`}
                >
                  Patient Reviews
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'about' ? (
                  <motion.div 
                    key="about" 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-12"
                  >
                    <div>
                      <h4 className="font-bold text-xl mb-4 text-slate-900 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
                        Professional Summary
                      </h4>
                      <p className="text-slate-600 text-base leading-relaxed">{doctor.about}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-xl mb-6 text-slate-900 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-primary-600 rounded-full"></span>
                        Working Schedule
                      </h4>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 md:gap-3 mb-8">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                          <div key={day} className={`p-3 md:p-4 rounded-xl md:rounded-2xl flex flex-col items-center border transition-all ${doctor.availability.includes(day) ? (i === 1 ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-primary-50 border-primary-100 text-primary-700') : 'bg-slate-50 border-slate-100 text-slate-300 opacity-50'}`}>
                            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-1.5 md:mb-2">{day}</span>
                            <span className="text-xs md:text-sm font-black">{12 + i}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="reviews" 
                    initial={{ opacity: 0, x: 10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6 mb-8"
                  >
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100 flex gap-6 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm overflow-hidden flex-shrink-0">
                          <img src={`https://i.pravatar.cc/100?u=review${i}`} alt="user" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-bold text-slate-900">Verified Patient {i}</h5>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">2 Days ago</span>
                          </div>
                          <div className="flex text-yellow-400 text-[10px] mb-3 gap-1">
                            {[1, 2, 3, 4, 5].map(star => <i key={star} className="fas fa-star"></i>)}
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed italic pr-8">"I had a wonderful experience. The doctor was very professional and took the time to explain everything clearly. Highly recommended!"</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile-only sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50">
        <button 
          onClick={() => navigate(`/appointments?tab=form&doctorId=${doctor.id}`)}
          className="w-full bg-primary-600 text-white py-5 rounded-[2rem] font-bold shadow-xl shadow-primary-200 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          Book Appointment <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span> $50.00
        </button>
      </div>
    </div>
  );
};

export default DoctorProfileScreen;
