
export type Status = 'Active' | 'Inactive';

export interface Role {
  id: string;
  name: string;
  description: string;
  status: Status;
}

export interface MenuItem {
  id: string;
  name: string;
  route: string;
  icon: string;
  parentId: string | null;
  displayOrder: number;
  status: Status;
}

export interface Permission {
  menuId: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface RolePermission {
  roleId: string;
  permissions: Permission[];
}

export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  status: Status;
}

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  roleId: string;
  clientId?: string;
  status: Status;
}

export interface AdminProject {
  id: string;
  name: string;
  clientId: string;
  managerIds: string[];
  status: 'In Progress' | 'Completed' | 'Archived' | 'Planning';
  description: string;
}

export interface DashboardStats {
  totalClients: number;
  totalProjects: number;
  totalMembers: number;
  totalTasks: number;
  activeProjects: number;
  inactiveProjects: number;
  overdueTasks: number;
}
