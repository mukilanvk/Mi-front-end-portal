
import React, { useState } from 'react';
import { Shield, Plus, Edit2, Trash2, X, Check } from 'lucide-react';
import { INITIAL_ROLES } from '../../store/adminSlice';
import { Role } from '../../types/admin.types';

const RoleMaster: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const toggleStatus = (id: string) => {
    setRoles(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' } : r));
  };

  const handleOpenAdd = () => {
    setEditingRole(null);
    setFormData({ name: '', description: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (role: Role) => {
    setEditingRole(role);
    setFormData({ name: role.name, description: role.description });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this role?')) {
      setRoles(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.name) return;
    if (editingRole) {
      setRoles(prev => prev.map(r => r.id === editingRole.id ? { ...r, ...formData } : r));
    } else {
      setRoles([...roles, { ...formData, id: Date.now().toString(), status: 'Active' }]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 md:p-8 w-full bg-[#f8fbff] min-h-full animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1.5">Role Master</h1>
          <p className="text-slate-400 text-xs font-medium">Control system-wide access levels.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-primary text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={14} strokeWidth={3} /> Add Role
        </button>
      </div>

      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
              <th className="px-6 py-4">Role Name</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {roles.map(role => (
              <tr key={role.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Shield size={14} />
                    </div>
                    <span className="text-slate-900 font-bold text-xs tracking-tight">{role.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <p className="text-slate-500 font-medium text-[11px] truncate max-w-xs">{role.description}</p>
                </td>
                <td className="px-6 py-4">
                   <button 
                    onClick={() => toggleStatus(role.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${role.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                   >
                      <div className={`size-1 rounded-full ${role.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      {role.status}
                   </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => handleOpenEdit(role)} className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(role.id)} className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase">{editingRole ? 'Edit Role' : 'New Role'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-300 hover:text-slate-500"><X size={18}/></button>
            </div>
            <div className="space-y-4">
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Role Name</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold focus:bg-white focus:border-primary outline-none transition-all" placeholder="e.g. Designer" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
               </div>
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-white focus:border-primary outline-none transition-all resize-none h-20" placeholder="Scope..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
               </div>
               <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-3 text-[10px] font-black uppercase text-slate-400 hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
                  <button onClick={handleSubmit} className="flex-1 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                    <Check size={14} strokeWidth={3} /> {editingRole ? 'Update' : 'Create'}
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleMaster;
