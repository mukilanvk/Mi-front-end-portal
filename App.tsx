
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
import { Board, Task } from './types/board.types';
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
    addSnack(adminLogin ? "Admin session initiated." : "Welcome back!", "success");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setView('landing');
    addSnack("You have been logged out.", "info");
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
      'Board Master': 'boards-list',
      'Admin Settings': 'settings'
    };
    if (routeMap[label]) setView(routeMap[label]);
    setSelectedBoardId(null);
  };

  const handleCreateBoard = (newBoard: Partial<Board>) => {
    const fullBoard: Board = {
      ...newBoard as Board,
      id: (boards.length + 1).toString(),
      tasks: [],
      comments: [],
      members: [],
      columns: [
        { id: 'c1', title: 'To Do', color: 'bg-sky-500' },
        { id: 'c2', title: 'In Progress', color: 'bg-amber-400' },
        { id: 'c3', title: 'Completed', color: 'bg-emerald-400' }
      ]
    };
    setBoards([...boards, fullBoard]);
    setView('boards-list');
    addSnack(`Board "${fullBoard.title}" created successfully!`);
  };

  if (view === 'landing') return <Landing onLogin={() => setView('login')} onRegister={() => setView('register')} />;
  if (view === 'login') return <Login onLogin={() => handleLogin(false)} onAdminLogin={() => handleLogin(true)} onRegister={() => setView('register')} onBack={() => setView('landing')} />;
  if (view === 'register') return <Register onLogin={() => setView('login')} onRegister={() => { setIsLoggedIn(true); setView('home'); }} onBack={() => setView('landing')} />;

  const currentBoard = boards.find(b => b.id === selectedBoardId);

  return (
    <MainLayout
      isAdmin={isAdmin}
      activeItem={view.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
      breadcrumbs={[{ label: isAdmin ? 'Admin Portal' : 'Workspace' }, { label: view.replace('-', ' ').toUpperCase() }]}
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
      
      {view === 'create-board' && <div className="flex justify-center p-4 md:p-8"><BoardCreation onBack={() => setView('boards-list')} onContinue={handleCreateBoard} /></div>}
      
      {view === 'home' && <Dashboard />}
      {view === 'boards-list' && <BoardsList boards={boards} onSelectBoard={(b) => { setSelectedBoardId(b.id); setView('board-detail'); }} onCreateNew={() => setView('create-board')} />}
      {view === 'board-detail' && currentBoard && <BoardDetail board={currentBoard} onBack={() => setView('boards-list')} onUpdateTasks={() => {}} onUpdateBoard={() => {}} onAddSnack={addSnack} />}
      {view === 'settings' && <SettingsPage onSave={() => addSnack("Saved!")} />}
      {view === 'analytics' && <AnalyticsPage />}
    </MainLayout>
  );
};

export default App;
