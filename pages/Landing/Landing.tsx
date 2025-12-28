
import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  PlayCircle, 
  Brush, 
  Rocket, 
  MoreHorizontal, 
  Check, 
  LayoutDashboard, 
  UserPlus, 
  Activity, 
  Bell, 
  Trophy, 
  TrendingUp, 
  Globe, 
  ThumbsUp, 
  Share2,
  Menu
} from 'lucide-react';

interface LandingProps {
  onLogin: () => void;
  onRegister: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="relative min-h-screen bg-mesh overflow-x-hidden lg:overflow-x-visible font-display flex flex-col">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] left-[-10%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-blue-100/60 rounded-full blur-[60px] md:blur-[100px] mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[15%] right-[-10%] w-[250px] md:w-[600px] h-[250px] md:h-[600px] bg-green-100/60 rounded-full blur-[60px] md:blur-[100px] mix-blend-multiply animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="size-8 md:size-10 bg-primary rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <CheckCircle2 size={20} className="md:size-6" strokeWidth={2.5} />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tight text-slate-900">Just Do It</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-10">
              {['Features', 'Pricing', 'About', 'Resources'].map((item) => (
                <a key={item} className="text-[11px] font-black text-slate-500 hover:text-primary transition-colors uppercase tracking-widest" href="#">{item}</a>
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={onLogin} className="text-[11px] font-black text-slate-500 hover:text-primary transition-colors uppercase tracking-widest px-2 md:px-4 py-2">Log In</button>
              <button onClick={onRegister} className="bg-primary hover:bg-blue-600 text-white text-[10px] md:text-xs font-black px-4 md:px-6 py-2 md:py-3.5 rounded-xl md:rounded-2xl shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest">
                Start Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-8 pb-16 md:pt-32 md:pb-40 overflow-hidden lg:overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
            <div className="flex flex-col gap-6 md:gap-8 text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm w-fit mx-auto lg:mx-0">
                <span className="flex h-2 w-2 rounded-full bg-accent-green animate-pulse"></span>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">v2.0 is now live</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[1.1] lg:leading-[0.95] text-slate-900">
                Turn Tasks Into <span className="gradient-text">Achievements</span>
              </h1>
              
              <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Experience the ultimate productivity tool that keeps you accountable. Visualize success and crush your goals with our immersive task management platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
                <button onClick={onRegister} className="bg-primary hover:bg-blue-600 text-white text-sm md:text-base font-black h-14 md:h-16 px-8 md:px-12 rounded-2xl md:rounded-[1.5rem] shadow-2xl shadow-primary/25 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group active:scale-95">
                  Start Free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white hover:bg-slate-50 border-2 border-slate-100 text-slate-700 text-sm md:text-base font-black h-14 md:h-16 px-8 md:px-10 rounded-2xl md:rounded-[1.5rem] shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95">
                  <PlayCircle size={22} className="text-primary" />
                  Watch Demo
                </button>
              </div>

              <div className="mt-6 md:mt-12 flex items-center justify-center lg:justify-start gap-4 md:gap-6 text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-widest">
                <div className="flex -space-x-2 md:-space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-xl border-2 md:border-4 border-white bg-slate-200 bg-cover shadow-xl" style={{ backgroundImage: `url('https://picsum.photos/seed/${i+50}/40/40')` }}></div>
                  ))}
                </div>
                <p>10,000+ teams syncing</p>
              </div>
            </div>

            {/* Visual Part */}
            <div className="relative h-[360px] md:h-[600px] w-full flex items-center justify-center scale-[0.7] sm:scale-[0.85] md:scale-100">
              <div className="absolute inset-0 bg-gradient-radial from-blue-100/50 to-transparent blur-3xl opacity-50"></div>
              
              {/* Card Layer 1 (Back) */}
              <div className="absolute w-[300px] md:w-[400px] bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-2xl transform rotate-12 -translate-y-16 translate-x-16 md:-translate-y-24 md:translate-x-24 opacity-40 animate-float-delayed">
                <div className="h-4 w-24 bg-slate-100 rounded-full mb-6"></div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                  <div className="h-2 w-2/3 bg-slate-50 rounded-full"></div>
                </div>
              </div>

              {/* Card Layer 2 (Middle) */}
              <div className="absolute w-[300px] md:w-[400px] glass-card p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl transform -rotate-6 -translate-x-8 -translate-y-8 md:-translate-x-12 md:-translate-y-12 z-0 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="size-12 md:size-14 rounded-xl md:rounded-2xl bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                    <Brush size={24} className="md:size-28" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-black text-base md:text-lg">Design System</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">In Progress • 80%</p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 md:h-3 rounded-full mb-6 overflow-hidden">
                  <div className="bg-accent-purple h-full rounded-full w-[80%] shadow-[0_0_15px_rgba(139,92,246,0.3)]"></div>
                </div>
              </div>

              {/* Card Layer 3 (Front Focus) */}
              <div className="absolute w-[320px] md:w-[420px] bg-slate-900 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_40px_100px_-15px_rgba(15,23,42,0.4)] z-10 border border-slate-800 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex justify-between items-start mb-8 md:mb-10">
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className="size-12 md:size-14 rounded-xl md:rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                      <Rocket size={24} className="md:size-28" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-white font-black text-lg md:text-xl tracking-tight leading-none">Launch</h3>
                      <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1.5 md:mt-2">Due Today</p>
                    </div>
                  </div>
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <MoreHorizontal size={20} md:size={24} />
                  </button>
                </div>
                
                <div className="space-y-4 md:space-y-6 mb-8 md:mb-10 text-left">
                  <TaskPreviewItem label="Review copy drafts" checked={false} />
                  <TaskPreviewItem label="Finalize assets" checked={true} />
                </div>
                
                <button className="w-full py-3 md:py-4 bg-primary hover:bg-blue-600 rounded-xl md:rounded-[1.25rem] text-xs md:text-sm font-black uppercase tracking-[0.1em] md:tracking-[0.15em] transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-primary/20">
                  <CheckCircle2 size={16} md:size={18} strokeWidth={2.5} />
                  Complete Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-slate-100 bg-white/40 backdrop-blur-sm relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 md:mb-12">Powering modern teams</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 cursor-default">
            {['GOOGLE', 'IBM', 'MICROSOFT', 'SPOTIFY'].map(brand => (
              <span key={brand} className="text-lg md:text-2xl font-black text-slate-900 tracking-tighter">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-24">
            <h2 className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-4">Core Features</h2>
            <h3 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 md:mb-8 tracking-tighter">Everything you need to <br className="hidden md:block" />get things done</h3>
            <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed">Powerful features wrapped in a stunning interface designed for teams who want to move fast.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <FeatureCard icon={LayoutDashboard} title="Multi-Board" desc="Visualize your workflow with customizable boards." color="primary" />
            <FeatureCard icon={UserPlus} title="Team Sync" desc="Collaborate in real-time with live updates." color="accent-purple" />
            <FeatureCard icon={Activity} title="Analytics" desc="Track your momentum with interactive charts." color="accent-green" />
            <FeatureCard icon={Bell} title="Alerts" desc="Stay in the loop with smart notifications." color="accent-orange" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-12 pb-8 md:pt-24 md:pb-12 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12 mb-12 md:mb-20">
            <div className="col-span-2 space-y-4 md:space-y-8">
              <div className="flex items-center gap-3">
                <div className="size-8 md:size-10 bg-primary rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <CheckCircle2 size={18} md:size={24} strokeWidth={2.5} />
                </div>
                <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Just Do It</span>
              </div>
              <p className="text-slate-400 font-medium text-sm md:text-lg max-w-xs leading-relaxed">The productivity platform designed to help you achieve more with less stress.</p>
            </div>
            
            {/* Footer Categories - Optimized for mobile grid */}
            {['Product', 'Company', 'Legal'].map((cat, idx) => (
              <div key={cat} className={`${idx === 2 ? 'col-span-2 sm:col-span-1' : 'col-span-1'}`}>
                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4 md:mb-8">{cat}</h4>
                <ul className="space-y-2.5 md:space-y-4">
                  {['Features', 'Pricing', 'About Us', 'Privacy'].map(link => (
                    <li key={link}><a className="text-slate-400 hover:text-primary transition-colors font-bold text-xs md:text-sm tracking-tight" href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-6 md:pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-[9px] md:text-xs font-black uppercase tracking-widest text-center md:text-left">© 2024 Just Do It Inc.</p>
            <div className="flex gap-6 md:gap-8 text-slate-300">
               {[Globe, ThumbsUp, Share2].map((Icon, idx) => (
                 <a key={idx} href="#" className="hover:text-primary transition-all hover:scale-110">
                   <Icon size={18} md:size={24} />
                 </a>
               ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const TaskPreviewItem = ({ label, checked }: { label: string, checked: boolean }) => (
  <div className="flex items-center gap-3 md:gap-5 group cursor-pointer">
    <div className={`size-5 md:size-6 rounded-md md:rounded-lg border-2 flex items-center justify-center transition-all ${checked ? 'bg-primary border-primary' : 'border-slate-700 group-hover:border-primary'}`}>
      {checked && <Check size={12} className="md:size-14 text-white" strokeWidth={4} />}
    </div>
    <span className={`text-sm md:text-base font-bold transition-colors ${checked ? 'text-slate-500 line-through' : 'text-slate-300 group-hover:text-white'}`}>{label}</span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, color }: any) => {
  const colorMap: any = {
    'primary': 'bg-blue-100 text-blue-500',
    'accent-purple': 'bg-purple-100 text-purple-500',
    'accent-green': 'bg-emerald-100 text-emerald-500',
    'accent-orange': 'bg-orange-100 text-orange-500'
  };
  return (
    <div className="group relative p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 hover:-translate-y-1 transition-all duration-500 hover:border-primary/20">
      <div className={`size-12 md:size-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 transition-transform shadow-inner ${colorMap[color] || 'bg-slate-100'}`}>
        <Icon size={24} md:size={28} strokeWidth={2.5} />
      </div>
      <h4 className="text-lg md:text-2xl font-black text-slate-900 mb-2 md:mb-4 tracking-tight leading-none">{title}</h4>
      <p className="text-xs md:text-base text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  );
};

export default Landing;
