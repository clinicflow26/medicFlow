import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="p-6 min-h-screen bg-slate-50 flex flex-col">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 mt-4"
      >
        <h2 className="text-3xl font-bold text-slate-900 leading-tight">Create Account</h2>
        <p className="text-slate-500 mt-1">Join ClinicFlow for better healthcare</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
          <input 
            required
            type="text" 
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-white" 
            placeholder="Enter your name" 
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
          <input 
            required
            type="email" 
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-white" 
            placeholder="Enter your email" 
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
          <input 
            required
            type="tel" 
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-white" 
            placeholder="+1 234 567 890" 
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
          <div className="relative">
            <input 
              required
              type={showPassword ? "text" : "password"} 
              className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white" 
              placeholder="••••••••" 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1">Confirm Password</label>
          <input 
            required
            type="password" 
            className="w-full p-4 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white" 
            placeholder="••••••••" 
          />
        </div>

        <p className="px-1 text-xs text-slate-500 leading-relaxed">
          By signing up, you agree to our <span className="text-primary-600 font-bold underline">Terms of Service</span> and <span className="text-primary-600 font-bold underline">Privacy Policy</span>.
        </p>

        <button 
          type="submit"
          className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg active:scale-[0.98] transition-all"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center mt-8 text-slate-600 pb-8">
        Already have an account? <Link to="/login" className="text-primary-600 font-bold hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default RegisterScreen;
