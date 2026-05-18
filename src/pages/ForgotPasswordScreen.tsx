import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'success'>('email');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="p-6 min-h-screen bg-slate-50 flex flex-col">
      <button 
        onClick={() => navigate(-1)}
        className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 mb-8 mt-4"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <AnimatePresence mode="wait">
        {step === 'email' ? (
          <motion.div 
            key="email"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1"
          >
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">Forgot Password?</h2>
            <p className="text-slate-500 mt-2">Don't worry! It happens. Please enter the email associated with your account.</p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-white" 
                  placeholder="Enter your email" 
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary-100"
              >
                Send Reset Link
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center pb-20"
          >
            <div className="w-24 h-24 bg-green-50 rounded-4xl flex items-center justify-center mb-6 text-green-500">
              <i className="fas fa-check-circle text-5xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Check Your Email</h2>
            <p className="text-slate-500 mt-2 max-w-[280px]">We've sent a password reset link to your email address.</p>
            
            <button 
              onClick={() => navigate('/login')}
              className="mt-10 w-full bg-primary-600 text-white py-4 rounded-2xl font-bold"
            >
              Back to Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center mt-8 text-slate-600 pb-8 underline font-bold cursor-pointer">
        Need help?
      </p>
    </div>
  );
};

export default ForgotPasswordScreen;
