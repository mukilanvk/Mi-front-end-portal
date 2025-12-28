
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import NotificationCenter from '../components/NotificationCenter/NotificationCenter';
import Snackbar, { Snack } from '../components/Snackbar/Snackbar';

interface MainLayoutProps {
  children: React.ReactNode;
  showNotifications: boolean;
  onToggleNotifications: (show: boolean) => void;
  onNavigate: (label: string) => void;
  onCreateNew: () => void;
  snacks: Snack[];
  onRemoveSnack: (id: string) => void;
  onLogout: () => void;
  activeItem?: string;
  breadcrumbs?: { label: string; onClick?: () => void }[];
  isAdmin?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showNotifications, 
  onToggleNotifications, 
  onNavigate,
  onCreateNew,
  snacks,
  onRemoveSnack,
  onLogout,
  activeItem,
  breadcrumbs,
  isAdmin = false
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full relative overflow-hidden font-sans bg-mesh">
      {/* Sidebar - Handles both Desktop Collapsible and Mobile Drawer */}
      <Sidebar 
        onCreateNew={onCreateNew} 
        activeItem={activeItem} 
        onNavigate={(label) => {
          onNavigate(label);
          setIsMobileSidebarOpen(false);
        }}
        isAdmin={isAdmin}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col relative overflow-hidden transition-all duration-300`}>
        <Header 
          onToggleNotifications={() => onToggleNotifications(true)} 
          onToggleSidebar={() => setIsMobileSidebarOpen(true)}
          breadcrumbs={breadcrumbs}
          userName={isAdmin ? "Administrator" : "Jane Doe"}
          onLogout={onLogout}
        />
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide bg-slate-50/30">
          {children}
        </div>
      </main>

      {showNotifications && <NotificationCenter onClose={() => onToggleNotifications(false)} />}
      <Snackbar snacks={snacks} onRemove={onRemoveSnack} />
    </div>
  );
};

export default MainLayout;
