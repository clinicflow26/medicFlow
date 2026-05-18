import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { UPCOMING_APPOINTMENTS, DOCTORS, MOCK_DRAFTS } from '../constants';

const AppointmentScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'form' | 'list' | 'draft'>((searchParams.get('tab') as any) || 'list');
  const [isDoctorExpanded, setIsDoctorExpanded] = useState(false);
  
  const doctorId = searchParams.get('doctorId') || '1';
  const selectedDoctor = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0];

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'form' || tab === 'list' || tab === 'draft') {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'form' | 'list' | 'draft') => {
    setActiveTab(tab);
    const params: any = { tab };
    if (doctorId) params.doctorId = doctorId;
    setSearchParams(params);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6 md:p-12">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">Appointments</h2>
          <p className="text-slate-500 text-sm md:text-base mt-1">Manage your health visits and consultations</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl md:rounded-[1.5rem] shadow-sm border border-slate-100 w-full md:w-auto overflow-hidden">
          <button 
            onClick={() => handleTabChange('form')}
            className={`flex-1 py-3 px-2 rounded-xl md:rounded-[1.2rem] font-bold text-[9px] md:text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 md:gap-2 ${activeTab === 'form' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-400'}`}
          >
            <i className="fas fa-plus-circle text-[10px] md:text-xs"></i>
            <span className="truncate">Book New</span>
          </button>
          <button 
            onClick={() => handleTabChange('list')}
            className={`flex-1 py-3 px-2 rounded-xl md:rounded-[1.2rem] font-bold text-[9px] md:text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 md:gap-2 ${activeTab === 'list' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-400'}`}
          >
            <i className="fas fa-history text-[10px] md:text-xs"></i>
            <span className="truncate">History</span>
          </button>
          <button 
            onClick={() => handleTabChange('draft')}
            className={`flex-1 py-3 px-2 rounded-xl md:rounded-[1.2rem] font-bold text-[9px] md:text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 md:gap-2 ${activeTab === 'draft' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-400'}`}
          >
            <i className="fas fa-file-alt text-[10px] md:text-xs"></i>
            <span className="truncate">Drafts</span>
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'form' ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Side: Doctor Info (Desktop only sidebar or top on mobile) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden sticky top-8">
                <div className="p-8 text-center border-b border-slate-50">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-inner mx-auto mb-6">
                    <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-xl text-slate-900 mb-1">{selectedDoctor.name}</h4>
                  <p className="text-xs md:text-sm text-primary-600 font-bold uppercase tracking-wider">{selectedDoctor.specialization}</p>
                </div>
                
                <div className="p-8 space-y-6">
                   <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-4 rounded-2xl text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Exp.</p>
                      <p className="text-xs font-bold text-slate-900">{selectedDoctor.experience}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Fee</p>
                      <p className="text-xs font-bold text-slate-900">$50.00</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Clinic Address</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{selectedDoctor.address}</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">About Doctor</p>
                    <p className="text-xs text-slate-500 leading-relaxed italic">{selectedDoctor.about}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
                <h4 className="font-bold text-xl text-slate-900 mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-sm font-black">1</span>
                  Visit Information
                </h4>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Reason for Visit</label>
                    <select className="w-full p-4 md:p-5 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50 text-slate-700 font-bold text-sm">
                      <option>General Consultation</option>
                      <option>Follow Up</option>
                      <option>Emergency</option>
                      <option>Test Results</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Duration</label>
                    <div className="w-full p-4 md:p-5 rounded-2xl bg-slate-50 text-slate-700 font-bold text-sm border border-slate-100 flex items-center justify-between">
                       <span>30 Minutes</span>
                       <i className="fas fa-clock text-slate-300"></i>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Symptoms / Notes (Optional)</label>
                    <textarea 
                      rows={4}
                      placeholder="Describe your symptoms briefly to help the doctor prepare..."
                      className="w-full p-5 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50 text-sm"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
                <h4 className="font-bold text-xl text-slate-900 mb-8 flex items-center gap-4">
                  <span className="w-10 h-10 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center text-sm font-black">2</span>
                  Schedule Appointment
                </h4>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Select Available Date</label>
                    <input type="date" className="w-full p-5 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50 font-bold text-slate-700" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-4 block">Select Time Slot</label>
                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-6 gap-2 md:gap-3">
                      {['09:00 AM', '10:30 AM', '02:00 PM', '03:15 PM', '04:30 PM', '05:45 PM'].map((time, i) => (
                        <button key={time} className={`p-3 md:p-4 rounded-xl border text-[9px] md:text-xs font-bold transition-all ${i === 1 ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white border-slate-100 text-slate-500 hover:border-primary-100'}`}>
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-center justify-between p-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="text-center md:text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total Consultation Fee</p>
                  <p className="text-2xl font-black text-slate-900">$50.00 <span className="text-sm font-medium text-slate-400">/ Session</span></p>
                </div>
                <button className="w-full md:w-auto px-12 py-5 bg-primary-600 text-white rounded-[2rem] font-bold shadow-xl shadow-primary-300 active:scale-95 transition-all text-sm md:text-base">
                  Confirm Booking Now
                </button>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'list' ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="flex gap-2 mb-4">
              <span className="px-4 py-1.5 bg-primary-600 text-white rounded-full text-xs font-bold">Upcoming</span>
              <span className="px-4 py-1.5 bg-white text-slate-500 border border-slate-100 rounded-full text-xs font-bold">Past</span>
            </div>

            {UPCOMING_APPOINTMENTS.map((app) => (
              <div key={app.id} className="bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 group">
                <div className="flex gap-4 mb-4 pb-4 border-b border-slate-50">
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-slate-50 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                    <img src={DOCTORS.find(d => d.id === app.doctorId)?.image} alt="doctor" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-start">
                      <h5 className="font-black text-sm md:text-lg text-slate-900 truncate tracking-tight">{app.doctorName}</h5>
                      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-green-50 text-green-600 rounded-md">Confirmed</span>
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-500 font-bold opacity-70 truncate">{app.specialization} • {app.clinic}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <i className="far fa-calendar-alt text-[10px]"></i>
                        <span className="text-[10px] font-black leading-none">{app.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <i className="far fa-clock text-[10px]"></i>
                        <span className="text-[10px] font-black leading-none">{app.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-black text-[10px] hover:bg-slate-200 transition-colors uppercase tracking-widest leading-none">Cancel</button>
                  <button className="flex-1 py-3 bg-primary-50 text-primary-600 rounded-xl font-black text-[10px] hover:bg-primary-100 transition-colors uppercase tracking-widest leading-none border border-primary-100">Reschedule</button>
                </div>
              </div>
            ))}

            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <i className="fas fa-folder-open text-3xl"></i>
              </div>
              <p className="text-slate-400 font-medium italic">That's all for now!</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="draft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {MOCK_DRAFTS.length > 0 ? (
              MOCK_DRAFTS.map((draft) => (
                <div key={draft.id} className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100 group">
                  <div className="flex gap-4 mb-5 pb-5 border-b border-slate-50">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={draft.doctorImage} alt={draft.doctorName} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-bold text-slate-900 truncate">{draft.doctorName}</h5>
                      <div className="mt-1 inline-block px-2 py-0.5 bg-amber-50 text-amber-600 rounded-md text-[9px] font-bold uppercase tracking-wider">Pending Draft</div>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium italic">Updated {draft.lastUpdated}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center text-[10px]">
                        <i className="far fa-calendar-alt"></i>
                      </div>
                      <span className="text-xs font-bold">{draft.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center text-[10px]">
                        <i className="far fa-clock"></i>
                      </div>
                      <span className="text-xs font-bold">{draft.time}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-3.5 bg-slate-50 text-red-400 rounded-2xl font-bold text-xs active:scale-95 transition-transform">Delete Draft</button>
                    <button className="flex-1 py-3.5 bg-primary-600 text-white rounded-2xl font-bold text-xs active:scale-95 transition-transform shadow-lg shadow-primary-200">Confirm Booking</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <i className="fas fa-file-invoice text-3xl"></i>
                </div>
                <h5 className="font-bold text-slate-900">No Drafts found</h5>
                <p className="text-slate-400 text-sm max-w-[200px] mx-auto italic">Your unfinished bookings will appear here.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppointmentScreen;
