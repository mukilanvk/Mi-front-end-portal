
import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  BarChart2, 
  Settings, 
  Zap, 
  ShieldCheck, 
  Users, 
  Activity,
  Globe,
  Lock,
  List,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface SidebarProps {
  onCreateNew?: () => void;
  activeItem?: string;
  onNavigate?: (label: string) => void;
  isAdmin?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onCreateNew, 
  activeItem, 
  onNavigate, 
  isAdmin = false, 
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile
}) => {
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

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-[100] transform transition-all duration-300 ease-in-out md:relative md:translate-x-0
    ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full'}
    ${isCollapsed ? 'md:w-20' : 'md:w-64'}
    bg-white border-r border-slate-100 shadow-sm flex flex-col
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[90] md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full p-4 md:p-6 overflow-y-auto scrollbar-hide relative">
          {/* Collapse Toggle Button (Desktop only) */}
          {onToggleCollapse && (
            <button 
              onClick={onToggleCollapse}
              className="absolute -right-3 top-20 z-20 bg-white border border-slate-100 rounded-full p-1 text-slate-400 hover:text-primary shadow-sm hidden md:block"
            >
              {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          )}

          {/* Mobile Close Button */}
          <button 
            onClick={onCloseMobile}
            className="md:hidden absolute top-4 right-4 text-slate-400 p-2"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col gap-6 md:gap-8">
            <div 
              className={`flex gap-3 items-center px-2 cursor-pointer ${isCollapsed ? 'justify-center' : ''}`} 
              onClick={() => onNavigate?.(isAdmin ? 'System Dashboard' : 'Home')}
            >
              <div className={`size-8 md:size-9 shrink-0 flex items-center justify-center rounded-lg md:rounded-xl shadow-lg ${isAdmin ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-primary shadow-primary/20'} text-white`}>
                <Zap size={18} md:size={20} fill="currentColor" strokeWidth={2.5} />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <h1 className="text-sm md:text-base font-black tracking-tight text-slate-900 truncate">
                    {isAdmin ? 'AdminFlow' : 'FocusFlow'}
                  </h1>
                  {isAdmin && <span className="text-[7px] md:text-[8px] font-black text-emerald-500 uppercase tracking-widest leading-none mt-0.5">Control</span>}
                </div>
              )}
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem?.toLowerCase() === item.label.toLowerCase();
                
                return (
                  <button
                    key={item.label}
                    onClick={() => onNavigate?.(item.label)}
                    title={isCollapsed ? item.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg md:rounded-xl transition-all group border ${isCollapsed ? 'justify-center' : ''} ${
                      isActive 
                        ? isAdmin 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100 font-black'
                          : 'bg-primary/5 text-primary border-primary/10 font-bold' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-transparent'
                    }`}
                  >
                    <Icon size={18} className={isActive ? (isAdmin ? 'text-emerald-500' : 'text-primary') : 'text-slate-400 group-hover:text-slate-600'} />
                    {!isCollapsed && <span className="text-xs md:text-[13px] font-bold tracking-tight truncate">{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto pt-8 flex flex-col gap-6">
            <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl flex items-center gap-3 border ${isCollapsed ? 'justify-center' : ''} ${isAdmin ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
              <div className="size-7 md:size-8 rounded-lg bg-slate-200 bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://picsum.photos/seed/admin/80/80")' }} />
              {!isCollapsed && (
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-xs font-bold truncate text-slate-900">{isAdmin ? 'Admin' : 'Alex'}</span>
                  <span className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest ${isAdmin ? 'text-emerald-500' : 'text-slate-400'}`}>Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
