import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-8 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center pt-20"
      >
        <div className="w-24 h-24 bg-primary-100 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <i className="fas fa-heartbeat text-primary-600 text-5xl"></i>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">ClinicFlow</h1>
        <p className="text-slate-500 text-lg max-w-[250px] leading-relaxed">Book appointments easily with top specialists in your area.</p>
      </motion.div>
      
      <div className="w-full space-y-4 mb-8">
        <button 
          onClick={() => navigate('/register')}
          className="w-full bg-primary-600 text-white py-5 rounded-2xl text-lg font-bold shadow-lg shadow-primary-200 active:scale-[0.98] transition-all"
        >
          Get Started
        </button>
        <button 
          onClick={() => navigate('/login')}
          className="text-primary-600 font-bold hover:underline"
        >
          Already have an account? Log In
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
