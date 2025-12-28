
import React, { useState } from 'react';
import { Save, Check, ShieldCheck, ChevronRight, Eye, PlusCircle, Edit3, Trash2 } from 'lucide-react';
import { INITIAL_ROLES, INITIAL_MENUS } from '../../store/adminSlice';

const PermissionMaster: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState(INITIAL_ROLES[1].id);
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({});

  const togglePermission = (menuId: string, type: string) => {
    setPermissions(prev => ({
      ...prev,
      [menuId]: {
        ...prev[menuId],
        [type]: !prev[menuId]?.[type]
      }
    }));
  };

  return (
    <div className="p-8 w-full bg-[#f8fbff] min-h-full animate-fade-in">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2">Permission Matrix</h1>
          <p className="text-slate-400 text-sm font-medium">RBAC: Manage granular access control for all modules.</p>
        </div>
        <button className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">
          <Save size={16} strokeWidth={3} /> Save Matrix
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Role Selector Sidebar */}
        <div className="lg:col-span-1 space-y-4">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Roles</p>
           <div className="flex flex-col gap-2">
              {INITIAL_ROLES.map(role => (
                <button 
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border transition-all flex justify-between items-center group ${selectedRole === role.id ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                >
                  <span className="font-bold text-sm">{role.name}</span>
                  <ChevronRight size={14} className={selectedRole === role.id ? 'text-white' : 'text-slate-300 group-hover:translate-x-1 transition-transform'} />
                </button>
              ))}
           </div>
        </div>

        {/* Matrix Card */}
        <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Module Name</th>
                <th className="px-4 py-6 text-center">View</th>
                <th className="px-4 py-6 text-center">Create</th>
                <th className="px-4 py-6 text-center">Edit</th>
                <th className="px-4 py-6 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {INITIAL_MENUS.map(menu => (
                <tr key={menu.id} className="hover:bg-slate-50/30 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-slate-800 font-bold text-sm tracking-tight">{menu.name}</span>
                      <span className="text-[9px] text-slate-400 font-mono tracking-tighter uppercase">{menu.route}</span>
                    </div>
                  </td>
                  <td className="px-4 py-6"><MatrixToggle checked={permissions[menu.id]?.view ?? true} onClick={() => togglePermission(menu.id, 'view')} /></td>
                  <td className="px-4 py-6"><MatrixToggle checked={permissions[menu.id]?.create ?? false} onClick={() => togglePermission(menu.id, 'create')} /></td>
                  <td className="px-4 py-6"><MatrixToggle checked={permissions[menu.id]?.edit ?? false} onClick={() => togglePermission(menu.id, 'edit')} /></td>
                  <td className="px-4 py-6"><MatrixToggle checked={permissions[menu.id]?.delete ?? false} onClick={() => togglePermission(menu.id, 'delete')} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MatrixToggle = ({ checked, onClick }: { checked: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`mx-auto size-7 rounded-xl border-2 flex items-center justify-center transition-all ${checked ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/10' : 'bg-slate-50 border-slate-200 hover:border-emerald-300'}`}
  >
    {checked && <Check size={14} className="text-white" strokeWidth={4} />}
  </button>
);

export default PermissionMaster;
