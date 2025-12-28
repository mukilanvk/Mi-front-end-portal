
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, UserPlus } from 'lucide-react';

const MOCK_ADMIN_MEMBERS = [
  { id: '1', name: 'John Doe', email: 'john.doe@company.com', role: 'Admin', client: 'Internal', status: 'Active', avatar: 'https://picsum.photos/seed/john/80/80' },
  { id: '2', name: 'Sarah Wilson', email: 'sarah.wilson@company.com', role: 'Manager', client: 'TechCorp', status: 'Active', avatar: 'https://picsum.photos/seed/sarah2/80/80' },
  { id: '3', name: 'Mike Johnson', email: 'mike.johnson@company.com', role: 'Employee', client: 'Digital Sol.', status: 'Active', avatar: 'https://picsum.photos/seed/mike/80/80' },
  { id: '4', name: 'Emily Brown', email: 'emily.brown@company.com', role: 'Employee', client: 'Internal', status: 'Inactive', avatar: 'https://picsum.photos/seed/emily2/80/80' },
];

const MemberMaster: React.FC = () => {
  const [members, setMembers] = useState(MOCK_ADMIN_MEMBERS);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Employee' });

  const toggleStatus = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: m.status === 'Active' ? 'Inactive' : 'Active' } : m));
  };

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({ name: '', email: '', role: 'Employee' });
    setShowModal(true);
  };

  const handleOpenEdit = (member: any) => {
    setEditingMember(member);
    setFormData({ name: member.name, email: member.email, role: member.role });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this user?')) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) return;
    if (editingMember) {
      setMembers(prev => prev.map(m => m.id === editingMember.id ? { ...m, ...formData } : m));
    } else {
      setMembers([...members, { 
        ...formData, 
        id: Date.now().toString(), 
        status: 'Active', 
        client: 'Internal', 
        avatar: `https://picsum.photos/seed/${formData.name}/80/80` 
      }]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 md:p-8 w-full bg-[#f8fbff] min-h-full animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1.5">Member Master</h1>
          <p className="text-slate-400 text-xs font-medium">Manage user identity and permissions.</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-primary text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <UserPlus size={14} strokeWidth={3} /> Add Member
        </button>
      </div>

      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
              <th className="px-6 py-4">Profile</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {members.map(member => (
              <tr key={member.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                     <img src={member.avatar} className="size-8 rounded-lg object-cover border border-slate-100 shadow-sm" alt="u" />
                     <div className="flex flex-col min-w-0">
                        <span className="text-slate-900 font-bold text-xs tracking-tight truncate">{member.name}</span>
                        <span className="text-slate-400 font-medium text-[9px] truncate">{member.email}</span>
                     </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-primary text-[8px] font-black uppercase tracking-widest border border-blue-100">
                      {member.role}
                   </span>
                </td>
                <td className="px-6 py-4">
                   <button 
                    onClick={() => toggleStatus(member.id)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${member.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                   >
                      <div className={`size-1 rounded-full ${member.status === 'Active' ? 'bg-emerald-500 shadow-sm' : 'bg-slate-300'}`} />
                      {member.status}
                   </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => handleOpenEdit(member)} className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(member.id)} className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
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
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl">
            <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase mb-6">{editingMember ? 'Edit User' : 'Add User'}</h3>
            <div className="space-y-4">
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:bg-white focus:border-primary" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
               </div>
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:bg-white focus:border-primary" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
               </div>
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Role</label>
                  <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:bg-white focus:border-primary appearance-none" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                     <option>Employee</option>
                     <option>Manager</option>
                     <option>Admin</option>
                  </select>
               </div>
               <div className="flex gap-3 pt-3">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-3 text-[10px] font-black text-slate-400 uppercase hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
                  <button onClick={handleSubmit} className="flex-1 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                    <Check size={14} /> {editingMember ? 'Update' : 'Invite'}
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberMaster;
