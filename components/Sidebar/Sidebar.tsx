
import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  BarChart2, 
  Settings, 
  PlusCircle, 
  Zap, 
  ShieldCheck, 
  Users, 
  Activity,
  Globe,
  Lock,
  List
} from 'lucide-react';

interface SidebarProps {
  onCreateNew?: () => void;
  activeItem?: string;
  onNavigate?: (label: string) => void;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onCreateNew, activeItem, onNavigate, isAdmin = false }) => {
  const userNavItems = [
    { label: 'Home', icon: Home },
    { label: 'Boards', icon: LayoutDashboard },
    { label: 'Analytics', icon: BarChart2 },
    { label: 'Settings', icon: Settings },
  ];

  const adminNavItems = [
    { label: 'System Dashboard', icon: Activity },
    { label: 'Role Master', icon: ShieldCheck },
    { label: 'Menu Master', icon: List },
    { label: 'Permissions', icon: Lock },
    { label: 'Member Master', icon: Users },
    { label: 'Client Master', icon: Globe },
    { label: 'Board Master', icon: LayoutDashboard },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside className={`relative z-50 w-64 shrink-0 hidden md:flex flex-col border-r ${isAdmin ? 'bg-white border-slate-100 shadow-sm' : 'bg-white border-slate-100'}`}>
      <div className="flex flex-col h-full p-6 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-8">
          <div className="flex gap-3 items-center px-2 cursor-pointer" onClick={() => onNavigate?.(isAdmin ? 'System Dashboard' : 'Home')}>
            <div className={`size-9 flex items-center justify-center rounded-xl shadow-lg ${isAdmin ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-[#00cfc1] shadow-[#00cfc1]/20'} text-white`}>
              <Zap size={20} fill="currentColor" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h1 className={`text-base font-black tracking-tight text-slate-900`}>
                {isAdmin ? 'AdminFlow' : 'FocusFlow'}
              </h1>
              {isAdmin && <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest leading-none mt-0.5">Control Panel</span>}
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem?.toLowerCase() === item.label.toLowerCase();
              
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate?.(item.label)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group border ${
                    isActive 
                      ? isAdmin 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 font-black'
                        : 'bg-primary/5 text-primary border-primary/10 font-bold' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-transparent'
                  }`}
                >
                  <Icon size={16} className={isActive ? (isAdmin ? 'text-emerald-500' : 'text-primary') : 'text-slate-400 group-hover:text-slate-600'} />
                  <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto pt-8 flex flex-col gap-6">
          <div className={`p-4 rounded-2xl flex items-center gap-3 border ${isAdmin ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
            <div className="size-8 rounded-lg bg-slate-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://picsum.photos/seed/admin/80/80")' }} />
            <div className="flex flex-col text-left overflow-hidden">
              <span className={`text-xs font-bold truncate text-slate-900`}>{isAdmin ? 'Master Admin' : 'Alex Designer'}</span>
              <span className={`text-[8px] font-black uppercase tracking-widest ${isAdmin ? 'text-emerald-500' : 'text-slate-400'}`}>Authorized</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
