
import React, { useState } from 'react';
import { Rocket, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onAdminLogin: () => void;
  onRegister: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onAdminLogin, onRegister, onBack }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <div className="flex h-screen w-full font-display bg-background-light text-slate-900 overflow-hidden selection:bg-primary selection:text-white">
      {/* Left Section: Hero / Branding */}
      <div className={`hidden lg:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden transition-colors duration-700 ${isAdminMode ? 'bg-slate-950' : 'bg-[#0f172a]'}`}>
        {/* Mesh Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className={`absolute top-20 right-20 w-32 h-32 rounded-full blur-xl opacity-60 animate-float transition-colors ${isAdminMode ? 'bg-indigo-400' : 'bg-pink-400'}`}></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-3xl transform rotate-12 blur-lg opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 flex flex-col h-full justify-center">
          <div className="absolute top-0 left-0 flex items-center gap-3 cursor-pointer group" onClick={onBack}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-transform group-hover:scale-110`}>
              <Rocket size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">FocusFlow</span>
          </div>

          <div className="flex flex-col gap-8 mt-20">
            <div className="w-full max-w-[480px] aspect-[4/3] bg-contain bg-center bg-no-repeat animate-float" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2_WajtgS_byJy4kyeFHyAFKQ22c-8WtrdphYLaI-10W1f0bEYDVYqq93EbV_ZMUItEYhYeTSWjUWadcVuQxnkANiOK8hQdwg8-0pc2--53dszKYYfecTLEHz-12sybDPYnAlsQlJrc0_7QM5RCEbCJH019EvZAiyTQ-EEJQBU0baawX83FsbRbWIhZL5wejcGAVKtsOhwP7OGyyzgXK4s-7e11NqDV6ynVUCBOyS9kA7uGcmiWuHNTCCrbefVleyH7Xyp3NoUFNk")' }}></div>
            <div className="space-y-4 max-w-lg">
              <h1 className="text-5xl font-black text-white leading-[1.1] tracking-tight">
                {isAdminMode ? 'System Command' : 'Productivity'} <br/>
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isAdminMode ? 'from-indigo-400 to-cyan-400' : 'from-blue-300 via-purple-300 to-pink-300'}`}>
                  {isAdminMode ? 'Center Control.' : 'Made Beautiful.'}
                </span>
              </h1>
              <p className="text-lg text-blue-100/80 font-medium leading-relaxed">
                {isAdminMode 
                  ? 'Access secure infrastructure monitoring and enterprise-level management tools.' 
                  : 'Experience the future of work with our immersive 3D productivity suite. Organize, visualize, and execute with style.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="w-full lg:w-1/2 relative bg-slate-50 flex flex-col items-center justify-center p-6 lg:p-24">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        
        <div className="glass-card w-full max-w-md p-8 lg:p-12 rounded-[2rem] relative z-30 shadow-2xl bg-white/70 backdrop-blur-xl border border-white">
          <div className="mb-10 text-center lg:text-left flex justify-between items-start">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
                {isAdminMode ? 'Admin Portal' : 'Welcome Back'}
              </h2>
              <p className="text-slate-500 font-bold text-base">Enter your details to access your {isAdminMode ? 'secure' : 'work'}space.</p>
            </div>
          </div>

          <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); isAdminMode ? onAdminLogin() : onLogin(); }}>
            <div className="space-y-2">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Type</label>
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                 <button 
                   type="button" 
                   onClick={() => setIsAdminMode(false)}
                   className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${!isAdminMode ? 'bg-white shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   Personal
                 </button>
                 <button 
                   type="button"
                   onClick={() => setIsAdminMode(true)}
                   className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 ${isAdminMode ? 'bg-slate-900 shadow-sm text-indigo-400' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   <ShieldCheck size={14} />
                   Admin
                 </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className={`text-slate-400 group-focus-within:text-primary transition-colors`} />
                </div>
                <input className="block w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all duration-200" placeholder="name@company.com" type="email" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input className="block w-full pl-12 pr-4 py-4 bg-white/50 border-2 border-slate-100 rounded-2xl text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all duration-200" placeholder="••••••••" type="password" required />
              </div>
            </div>

            <button className={`group relative w-full flex justify-center py-4 px-6 rounded-2xl text-sm font-black uppercase tracking-widest text-white shadow-xl active:scale-95 transition-all duration-300 mt-2 ${isAdminMode ? 'bg-slate-950 shadow-indigo-500/20' : 'bg-gradient-to-r from-primary to-blue-600 shadow-blue-500/20'}`} type="submit">
              <span className="flex items-center gap-3">
                {isAdminMode ? 'Initiate Access' : 'Log In'} 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </span>
            </button>
            
            <p className="text-center text-sm font-bold text-slate-500 mt-6">
              Don't have an account? <span className="font-black text-primary hover:underline cursor-pointer ml-1" onClick={onRegister}>Sign up for free</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
