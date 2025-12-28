
import { Role, MenuItem, Client, AdminMember, AdminProject, DashboardStats, RolePermission } from '../types/admin.types';

// Mock initial data
export const INITIAL_ROLES: Role[] = [
  { id: '1', name: 'Super Admin', description: 'Full system access', status: 'Active' },
  { id: '2', name: 'Project Manager', description: 'Manage specific projects', status: 'Active' },
  { id: '3', name: 'Member', description: 'Standard task access', status: 'Active' },
];

export const INITIAL_MENUS: MenuItem[] = [
  { id: 'm1', name: 'Dashboard', route: 'admin-dashboard', icon: 'Activity', parentId: null, displayOrder: 1, status: 'Active' },
  { id: 'm2', name: 'Role Master', route: 'role-master', icon: 'ShieldCheck', parentId: null, displayOrder: 2, status: 'Active' },
  { id: 'm3', name: 'Menu Master', route: 'menu-master', icon: 'List', parentId: null, displayOrder: 3, status: 'Active' },
  { id: 'm4', name: 'Permissions', route: 'permission-master', icon: 'Lock', parentId: null, displayOrder: 4, status: 'Active' },
  { id: 'm5', name: 'Member Master', route: 'member-master', icon: 'Users', parentId: null, displayOrder: 5, status: 'Active' },
  { id: 'm6', name: 'Client Master', route: 'client-master', icon: 'Globe', parentId: null, displayOrder: 6, status: 'Active' },
  { id: 'm7', name: 'Project Master', route: 'project-master', icon: 'LayoutDashboard', parentId: null, displayOrder: 7, status: 'Active' },
];

// In a real app, you would use createSlice from @reduxjs/toolkit here.
// For this environment, we will export a simplified state management hook pattern.
