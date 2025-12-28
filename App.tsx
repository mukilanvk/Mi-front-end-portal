
import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import BoardsList from './pages/Boards/BoardsList';
import BoardCreation from './pages/BoardCreation/BoardCreation';
import BoardDetail from './pages/BoardDetail/BoardDetail';
import SettingsPage from './pages/Settings/Settings';
import AnalyticsPage from './pages/Analytics/Analytics';
import AdminDashboard from './pages/Admin/AdminDashboard';
import RoleMaster from './pages/Admin/RoleMaster';
import MenuMaster from './pages/Admin/MenuMaster';
import PermissionMaster from './pages/Admin/PermissionMaster';
import MemberMaster from './pages/Admin/MemberMaster';
import ClientMaster from './pages/Admin/ClientMaster';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { BOARDS } from './utils/constants';
import { Board } from './types/board.types';
import { Snack } from './components/Snackbar/Snackbar';

type View = 
  | 'landing' | 'login' | 'register' | 'home' 
  | 'boards-list' | 'create-board' | 'board-detail' 
  | 'settings' | 'analytics' | 'admin-dashboard' 
  | 'role-master' | 'menu-master' 
  | 'permission-master' | 'member-master' | 'client-master';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [boards, setBoards] = useState<Board[]>(BOARDS);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const addSnack = (message: string, type: Snack['type'] = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setSnacks(prev => [...prev, { id, message, type }]);
  };

  const removeSnack = (id: string) => setSnacks(prev => prev.filter(s => s.id !== id));

  const handleLogin = (adminLogin: boolean = false) => {
    setIsLoggedIn(true);
    setIsAdmin(adminLogin);
    setView(adminLogin ? 'admin-dashboard' : 'home');
    addSnack(adminLogin ? "Admin session started" : "Welcome back!", "success");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setView('landing');
    addSnack("Logged out successfully.", "info");
  };

  const handleNavigate = (label: string) => {
    const routeMap: Record<string, View> = {
      'Home': 'home',
      'Boards': 'boards-list',
      'Settings': 'settings',
      'Analytics': 'analytics',
      'System Dashboard': 'admin-dashboard',
      'Role Master': 'role-master',
      'Menu Master': 'menu-master',
      'Permissions': 'permission-master',
      'Member Master': 'member-master',
      'Client Master': 'client-master',
    };
    if (routeMap[label]) setView(routeMap[label]);
    setSelectedBoardId(null);
  };

  const currentBoard = boards.find(b => b.id === selectedBoardId);

  if (view === 'landing') return <Landing onLogin={() => setView('login')} onRegister={() => setView('register')} />;
  if (view === 'login') return <Login onLogin={() => handleLogin(false)} onAdminLogin={() => handleLogin(true)} onRegister={() => setView('register')} onBack={() => setView('landing')} />;
  if (view === 'register') return <Register onLogin={() => setView('login')} onRegister={() => handleLogin(false)} onBack={() => setView('landing')} />;

  return (
    <MainLayout
      isAdmin={isAdmin}
      activeItem={view.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
      breadcrumbs={[{ label: isAdmin ? 'Admin' : 'Workspace' }, { label: view.replace('-', ' ').toUpperCase() }]}
      showNotifications={showNotifications}
      onToggleNotifications={setShowNotifications}
      onNavigate={handleNavigate}
      onCreateNew={() => setView('create-board')}
      snacks={snacks}
      onRemoveSnack={removeSnack}
      onLogout={handleLogout}
    >
      {view === 'admin-dashboard' && <AdminDashboard />}
      {view === 'role-master' && <RoleMaster />}
      {view === 'menu-master' && <MenuMaster />}
      {view === 'permission-master' && <PermissionMaster />}
      {view === 'member-master' && <MemberMaster />}
      {view === 'client-master' && <ClientMaster />}
      
      {view === 'home' && <Dashboard />}
      {view === 'boards-list' && <BoardsList boards={boards} onSelectBoard={(b) => { setSelectedBoardId(b.id); setView('board-detail'); }} onCreateNew={() => setView('create-board')} />}
      {view === 'board-detail' && currentBoard && <BoardDetail board={currentBoard} onBack={() => setView('boards-list')} onUpdateTasks={(t) => setBoards(prev => prev.map(b => b.id === currentBoard.id ? { ...b, tasks: t } : b))} onUpdateBoard={(u) => setBoards(prev => prev.map(b => b.id === currentBoard.id ? { ...b, ...u } : b))} onAddSnack={addSnack} />}
      {view === 'create-board' && <div className="flex justify-center p-8"><BoardCreation onBack={() => setView('boards-list')} onContinue={(b) => { setBoards([...boards, { ...b as Board, id: Date.now().toString(), tasks: [], members: [] }]); setView('boards-list'); addSnack('Board Created!'); }} /></div>}
      {view === 'settings' && <SettingsPage onSave={() => addSnack("Settings saved!")} />}
      {view === 'analytics' && <AnalyticsPage />}
    </MainLayout>
  );
};

export default App;
