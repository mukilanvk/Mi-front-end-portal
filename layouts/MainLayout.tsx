
import React from 'react';
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
  activeItem,
  breadcrumbs,
  isAdmin = false
}) => {
  return (
    <div className={`flex h-screen w-full relative overflow-hidden font-sans bg-mesh`}>
      <Sidebar 
        onCreateNew={onCreateNew} 
        activeItem={activeItem} 
        onNavigate={onNavigate}
        isAdmin={isAdmin}
      />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Header 
          onToggleNotifications={() => onToggleNotifications(true)} 
          breadcrumbs={breadcrumbs}
          userName={isAdmin ? "System Controller" : "Alex Designer"}
        />
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
          {children}
        </div>
      </main>

      {showNotifications && <NotificationCenter onClose={() => onToggleNotifications(false)} />}
      <Snackbar snacks={snacks} onRemove={onRemoveSnack} />
    </div>
  );
};

export default MainLayout;
