import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';

const LoginScreen = () => {
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
        className="mb-10 mt-8"
      >
        <h2 className="text-3xl font-bold text-slate-900 leading-tight">Welcome Back</h2>
        <p className="text-slate-500 mt-2">Log in to your ClinicFlow account</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-5 flex-1">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1">Email or Phone Number</label>
          <div className="relative">
            <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              required
              type="text" 
              className="w-full p-4 pl-12 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-white" 
              placeholder="Enter your email" 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
          <div className="relative">
            <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              required
              type={showPassword ? "text" : "password"} 
              className="w-full p-4 pl-12 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white" 
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

        <div className="flex items-center justify-between pb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-primary-600 focus:ring-primary-500" />
            <span className="text-sm text-slate-600">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm font-bold text-primary-600 hover:underline">Forgot Password?</Link>
        </div>

        <button 
          type="submit"
          className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold mt-4 shadow-lg shadow-primary-100 active:scale-[0.98] transition-all"
        >
          Login
        </button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-3 bg-slate-50 text-slate-500">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button type="button" className="flex items-center justify-center gap-3 p-3.5 bg-white rounded-2xl ring-1 ring-slate-200 hover:ring-slate-300 transition-all active:scale-95">
            <i className="fab fa-google text-red-500 text-base"></i>
            <span className="font-bold text-slate-700 text-sm">Google</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-3 p-3.5 bg-white rounded-2xl ring-1 ring-slate-200 hover:ring-slate-300 transition-all active:scale-95">
            <i className="fab fa-apple text-slate-900 text-base"></i>
            <span className="font-bold text-slate-700 text-sm">Apple</span>
          </button>
        </div>
      </form>

      <p className="text-center mt-8 text-slate-600 pb-8">
        Don't have an account? <Link to="/register" className="text-primary-600 font-bold hover:underline">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginScreen;
