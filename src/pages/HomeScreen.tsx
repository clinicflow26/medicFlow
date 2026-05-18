import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { DOCTORS, SPECIALISTS, MOCK_NOTIFICATIONS } from "../constants";
import { useLocation } from "../hooks/useLocation";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "confirmed":
        return "fa-check-circle text-green-500";
      case "rescheduled":
        return "fa-clock text-blue-500";
      case "completed":
        return "fa-clipboard-check text-slate-400";
      case "pending":
        return "fa-spinner fa-spin text-amber-500";
      default:
        return "fa-bell text-primary-500";
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "rescheduled":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-slate-100 text-slate-600";
      case "pending":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-primary-100 text-primary-700";
    }
  };
  console.log(location);
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Mobile-only header */}
      <header className="md:hidden bg-white p-4 sticky top-0 z-40 border-b border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-primary-600 tracking-tighter leading-none mb-0.5">
              ClinicFlow
            </h1>
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/select-location")}
              className="flex items-center gap-1 group active:scale-95 transition-transform min-w-0"
            >
              {location.loading ? (
                <div className="w-20 h-3 bg-slate-100 rounded-full animate-pulse"></div>
              ) : (
                <>
                  <i className="fas fa-location-dot text-[9px] text-primary-500"></i>
                  <span className="text-[10px] font-extrabold text-slate-500 truncate max-w-[140px] uppercase tracking-tight">
                    {location?.error && location?.error !== null
                      ? "Andheri West, Mumbai"
                      : `${location.area}, ${location.city}`}
                  </span>
                  <i className="fas fa-chevron-down text-[7px] text-slate-300 group-hover:text-primary-600 transition-colors flex-shrink-0"></i>
                </>
              )}
            </motion.button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors relative active:scale-95 border border-slate-100"
              >
                <i className="fas fa-bell text-xs"></i>
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 border border-white rounded-full"></span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowNotifications(false)}
                      className="fixed inset-0 z-40 bg-black/5"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-[300px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 z-50 overflow-hidden"
                    >
                      <div className="p-5 border-b border-slate-50 flex justify-between items-center">
                        <h4 className="font-bold text-slate-900">
                          Notifications
                        </h4>
                        <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-2 py-0.5 rounded-full">
                          3 New
                        </span>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto no-scrollbar py-2">
                        {MOCK_NOTIFICATIONS.map((notif) => (
                          <div
                            key={notif.id}
                            className="p-4 hover:bg-slate-50 transition-colors flex gap-4 cursor-pointer border-b border-slate-50 last:border-0"
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm border border-slate-100 flex-shrink-0`}
                            >
                              <i
                                className={`fas ${getStatusIcon(notif.type)} text-lg`}
                              ></i>
                            </div>
                            <div>
                              <div className="flex justify-between items-start mb-0.5">
                                <h5 className="text-[13px] font-bold text-slate-900 leading-none">
                                  {notif.doctorName}
                                </h5>
                                <span
                                  className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${getBadgeColor(notif.type)}`}
                                >
                                  {notif.type}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-medium mb-1">
                                {notif.status}
                              </p>
                              <p className="text-[10px] text-slate-400 font-bold">
                                {notif.dateTime}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-4 text-xs font-bold text-slate-400 hover:text-primary-600 transition-colors">
                        Clear All Notifications
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div
          onClick={() => navigate("/search")}
          className="relative group cursor-pointer overflow-hidden"
        >
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary-500 transition-colors"></i>
          <div className="w-full bg-slate-100 p-4 pl-12 rounded-2xl text-xs md:text-sm font-medium text-slate-400 group-hover:bg-slate-200 transition-colors truncate">
            Search doctors, specialty, symptoms...
          </div>
        </div>
      </header>

      <section className="p-5 md:pt-10">
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* Physical Appointment Card */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/categories?type=physical")}
            className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-4 text-white relative overflow-hidden shadow-lg shadow-primary-200/50 cursor-pointer group flex flex-col justify-between min-h-[140px]"
          >
            <div className="relative z-10">
              <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
                <i className="fas fa-hospital-user text-sm"></i>
              </div>
              <h3 className="text-sm font-black mb-1 tracking-tight leading-tight">
                Physical
                <br />
                Appointment
              </h3>
              <p className="text-primary-100 text-[9px] font-bold opacity-80 leading-tight">
                Visit doctors in person
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-primary-200 group-hover:text-white transition-colors mt-4">
              <span>Book</span>
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </div>
            <i className="fas fa-building-medical absolute -right-2 -top-2 text-5xl opacity-10 group-hover:scale-110 transition-transform pointer-events-none"></i>
          </motion.div>

          {/* Instant Video Consult Card */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/categories?type=video")}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-4 text-white relative overflow-hidden shadow-lg shadow-blue-200/50 cursor-pointer group flex flex-col justify-between min-h-[140px]"
          >
            <div className="relative z-10">
              <div className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
                <i className="fas fa-video text-sm"></i>
              </div>
              <h3 className="text-sm font-black mb-1 tracking-tight leading-tight">
                Instant Video
                <br />
                Consult
              </h3>
              <p className="text-blue-100 text-[9px] font-bold opacity-80 leading-tight">
                Talk online instantly
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-blue-200 group-hover:text-white transition-colors mt-4">
              <span>Start</span>
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </div>
            <i className="fas fa-file-video absolute -right-2 -top-2 text-5xl opacity-10 group-hover:scale-110 transition-transform pointer-events-none"></i>
          </motion.div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="font-extrabold text-lg text-slate-900 tracking-tight">
              Categories
            </h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
              Top Specialists Near You
            </p>
          </div>
          <button
            onClick={() => navigate("/categories")}
            className="text-primary-600 text-[10px] font-black uppercase tracking-widest hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors border border-primary-100"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 md:gap-6">
          {SPECIALISTS.slice(0, 7).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() =>
                navigate(`/search?category=${item.name.toLowerCase()}`)
              }
              className="bg-white p-2.5 md:p-8 rounded-2xl md:rounded-[2.5rem] text-center shadow-sm border border-slate-100 cursor-pointer active:scale-95 hover:border-primary-200 transition-all group overflow-hidden"
            >
              <div className="w-10 h-10 md:w-20 md:h-20 bg-slate-50 rounded-xl md:rounded-3xl flex items-center justify-center mx-auto mb-2 md:mb-4 text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all shadow-inner">
                <i className={`fas ${item.icon} text-base md:text-3xl`}></i>
              </div>
              <span className="text-[9px] md:text-sm font-extrabold text-slate-700 block truncate">
                {item.name}
              </span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-2.5 md:p-8 rounded-2xl md:rounded-[2.5rem] text-center shadow-sm border border-slate-100 cursor-pointer active:scale-95 hover:border-primary-200 transition-all group overflow-hidden"
          >
            <div className="w-10 h-10 md:w-20 md:h-20 bg-slate-50 rounded-xl md:rounded-3xl flex items-center justify-center mx-auto mb-2 md:mb-4 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all shadow-inner">
              <i className="fas fa-ellipsis-h text-base"></i>
            </div>
            <span className="text-[9px] md:text-sm font-extrabold text-slate-700 block truncate">
              More
            </span>
          </motion.div>
        </div>
      </section>

      <section className="px-5 pb-24 md:pb-20">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-6">
            <div>
              <h4 className="font-extrabold text-lg text-slate-900 tracking-tight">
                Health Services
              </h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">
                Instant access to care
              </p>
            </div>
            <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
              {[
                { icon: "fa-video", label: "Video", color: "amber" },
                { icon: "fa-house-medical", label: "Home", color: "blue" },
                { icon: "fa-flask", label: "Lab", color: "green" },
              ].map((service) => (
                <div
                  key={service.label}
                  className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100 flex flex-col items-center gap-1.5 flex-1 min-w-[75px] md:min-w-[140px] hover:bg-white hover:shadow-lg transition-all cursor-pointer"
                >
                  <div
                    className={`w-9 h-9 md:w-12 md:h-12 bg-${service.color}-50 rounded-xl flex items-center justify-center text-${service.color}-600`}
                  >
                    <i className={`fas ${service.icon} text-sm md:text-lg`}></i>
                  </div>
                  <span className="text-[8px] md:text-xs font-black text-slate-700 uppercase tracking-widest text-center">
                    {service.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8 bg-primary-50/30 p-6 rounded-[2rem] border border-primary-100/50">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 shrink-0 border border-primary-50">
                <i className="fas fa-shield-heart text-xl"></i>
              </div>
              <div>
                <h5 className="font-black text-slate-900 text-sm tracking-tight">
                  Wellness Plan
                </h5>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight opacity-70 leading-none">
                  Family Subscription
                </p>
              </div>
            </div>
            <div className="flex items-center md:justify-end">
              <button className="w-full md:w-auto bg-primary-600 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg shadow-primary-200 active:scale-95 transition-all">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
