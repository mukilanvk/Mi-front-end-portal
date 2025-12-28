
import React, { useState } from 'react';
import { Search, Bell, ChevronRight, Menu, LogOut, Settings, User, UserCircle } from 'lucide-react';

interface HeaderProps {
  onToggleNotifications: () => void;
  onToggleSidebar: () => void;
  onLogout: () => void;
  breadcrumbs?: { label: string; onClick?: () => void }[];
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onToggleNotifications, 
  onToggleSidebar, 
  onLogout,
  breadcrumbs, 
  userName = "Jane Doe" 
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-14 md:h-20 shrink-0 border-b border-slate-200 glass-panel flex items-center justify-between px-3 md:px-10 sticky top-0 z-40 bg-white/40 backdrop-blur-md">
      <div className="flex items-center gap-1 md:gap-4">
        {/* Mobile Sidebar Toggle Hamburger */}
        <button 
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-all"
          aria-label="Toggle Menu"
        >
          <Menu size={18} />
        </button>

        <nav className="flex items-center gap-1 md:gap-3 text-xs md:text-sm overflow-hidden">
          {breadcrumbs ? (
            breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight size={10} className="text-slate-300 shrink-0" strokeWidth={3} />}
                <button 
                  onClick={crumb.onClick}
                  className={`transition-all truncate ${idx === breadcrumbs.length - 1 ? 'text-slate-900 font-black text-xs md:text-lg tracking-tight' : 'text-slate-400 font-bold hover:text-primary text-[10px] md:text-xs'}`}
                >
                  {crumb.label}
                </button>
              </React.Fragment>
            ))
          ) : (
            <span className="text-slate-900 font-black text-sm md:text-xl tracking-tight">Dashboard</span>
          )}
        </nav>
      </div>

      <div className="hidden lg:flex flex-1 max-w-sm mx-8">
        <div className="relative w-full group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Search size={16} strokeWidth={2.5} />
          </span>
          <input
            className="w-full bg-slate-100/70 border-none rounded-xl py-2 pl-10 pr-4 text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all shadow-inner"
            placeholder="Search..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 md:gap-6">
        <button 
          onClick={onToggleNotifications}
          className="relative p-1.5 md:p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg md:rounded-xl transition-all"
        >
          <Bell size={18} md:size={20} />
          <span className="absolute top-1.5 right-1.5 size-1.5 md:size-2 bg-rose-500 rounded-full border border-white shadow-sm"></span>
        </button>
        
        <div className="h-5 md:h-6 w-[1px] bg-slate-200 mx-0.5 hidden sm:block"></div>
        
        <div className="relative">
          <div 
            className="flex items-center gap-2 md:gap-3 pl-1 cursor-pointer group"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-[10px] md:text-xs font-black text-slate-900 leading-none">{userName}</p>
              <p className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Superuser</p>
            </div>
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-lg md:rounded-xl size-8 md:size-10 ring-2 ring-white shadow-md group-hover:scale-105 transition-all"
              style={{ backgroundImage: 'url("https://picsum.photos/seed/user/80/80")' }}
            />
          </div>

          {/* Logout & Profile Dropdown */}
          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-20 animate-fade-in-up">
                <div className="px-4 py-2.5 border-b border-slate-50 mb-1">
                  <p className="text-[11px] md:text-xs font-black text-slate-900 truncate">{userName}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Active Now</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors text-left">
                  <User size={14} /> Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors text-left">
                  <Settings size={14} /> Settings
                </button>
                <div className="h-px bg-slate-100 my-1 mx-2" />
                <button 
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-xs font-black text-rose-500 hover:bg-rose-50 transition-colors text-left"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
