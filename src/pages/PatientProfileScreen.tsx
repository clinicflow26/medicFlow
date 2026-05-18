import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const PatientProfileScreen = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    phone: '+1 234 567 890',
    age: '24',
    gender: 'Male'
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, API call here
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <div className="bg-white p-8 pb-32 md:pb-40 rounded-b-[4rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary-50/50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-primary-50/30 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 pt-8 md:pt-16">
          <div className="relative group">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-200 rounded-[2.5rem] md:rounded-[4rem] border-4 border-white shadow-2xl overflow-hidden group-hover:rotate-3 transition-transform duration-500">
              <img src="https://i.pravatar.cc/150?u=9" alt="profile" className="w-full h-full object-cover" />
            </div>
            {isEditing && (
              <motion.button 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-2 -right-2 md:bottom-2 md:right-2 w-12 h-12 bg-primary-600 text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-lg active:scale-90 transition-all z-20"
              >
                <i className="fas fa-camera text-base"></i>
              </motion.button>
            )}
          </div>
          <motion.div layout className="text-center mt-8">
            <h3 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">{profile.name}</h3>
            <p className="text-slate-500 md:text-lg font-medium mt-1">{profile.email}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-20 md:-mt-24 relative z-20 space-y-6 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Blood', value: 'B+', icon: 'fa-droplet', color: 'red' },
            { label: 'Weight', value: '72kg', icon: 'fa-weight-scale', color: 'blue' },
            { label: 'Height', value: '178cm', icon: 'fa-arrows-up-down', color: 'green' },
            { label: 'Age', value: '24y', icon: 'fa-calendar', color: 'amber' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className={`w-10 h-10 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl flex items-center justify-center flex-shrink-0 border border-${stat.color}-100/50`}>
                <i className={`fas ${stat.icon} text-sm`}></i>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-sm font-black text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50">
            <div>
              <h4 className="font-bold text-xl text-slate-900 tracking-tight">Personal Information</h4>
              <p className="text-sm text-slate-400 font-medium">Updated details reflect across all your bookings</p>
            </div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="text-primary-600 text-[10px] md:text-sm font-bold bg-primary-50 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl active:scale-95 transition-all hover:bg-primary-100 border border-primary-100 flex-shrink-0"
              >
                <i className="fas fa-user-edit mr-2"></i>
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2 min-w-0">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="text-slate-400 text-[10px] md:text-sm font-bold px-3 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl hover:bg-slate-50 truncate"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="bg-primary-600 text-white text-[10px] md:text-sm font-bold px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl shadow-lg shadow-primary-200 active:scale-95 transition-all truncate"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { label: 'Full Name', key: 'name', type: 'text', icon: 'fa-user' },
              { label: 'Email Address', key: 'email', type: 'email', icon: 'fa-envelope' },
              { label: 'Phone Number', key: 'phone', type: 'tel', icon: 'fa-phone' },
              { label: 'Age', key: 'age', type: 'number', icon: 'fa-calendar' },
              { label: 'Gender', key: 'gender', type: 'select', icon: 'fa-venus-mars', options: ['Male', 'Female', 'Other'] }
            ].map((field) => (
              <div key={field.key} className="space-y-2.5 group">
                <div className="flex items-center gap-2.5 text-slate-400">
                  <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-[10px]">
                    <i className={`fas ${field.icon}`}></i>
                  </div>
                  <label className="text-[10px] font-bold uppercase tracking-widest leading-none">{field.label}</label>
                </div>
                
                <AnimatePresence mode="wait">
                  {!isEditing ? (
                    <motion.p 
                      key="view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-slate-700 font-bold text-base md:text-lg pl-1"
                    >
                      {(profile as any)[field.key]}
                    </motion.p>
                  ) : (
                    <motion.div 
                      key="edit"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {field.type === 'select' ? (
                        <select 
                          value={(profile as any)[field.key]}
                          onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                          className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-primary-500 outline-none font-bold text-slate-700 transition-all"
                        >
                          {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input 
                          type={field.type}
                          value={(profile as any)[field.key]}
                          onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                          className="w-full p-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-primary-500 outline-none font-bold text-slate-700 shadow-inner transition-all"
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            className="p-5 md:p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all hover:bg-slate-50"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center shrink-0">
                <i className="fas fa-lock"></i>
              </div>
              <div className="text-left min-w-0">
                <h5 className="font-bold text-slate-900 truncate">Security Settings</h5>
                <p className="text-[10px] text-slate-400">Passwords & Auth</p>
              </div>
            </div>
            <i className="fas fa-chevron-right text-slate-300 group-hover:translate-x-1 transition-transform flex-shrink-0"></i>
          </button>
          
          <button 
            onClick={() => navigate('/login')}
            className="p-5 md:p-6 bg-white rounded-3xl border border-red-50 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all hover:bg-red-50/30"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shrink-0">
                <i className="fas fa-sign-out-alt"></i>
              </div>
              <div className="text-left min-w-0">
                <h5 className="font-bold text-red-500 truncate">Logout Account</h5>
                <p className="text-[10px] text-red-400/70">Sign out safely</p>
              </div>
            </div>
            <i className="fas fa-arrow-right text-red-300 group-hover:translate-x-1 transition-transform text-xs flex-shrink-0"></i>
          </button>
        </div>

        <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest pt-8 pb-4">
          ClinicFlow Patient Dashboard v1.2.0 • Premium Healthcare SaaS
        </p>
      </div>
    </div>
  );
};

export default PatientProfileScreen;
