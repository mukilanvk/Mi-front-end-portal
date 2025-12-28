
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Building2, Globe, Check, X, MapPin } from 'lucide-react';

const MOCK_CLIENTS = [
  { id: '1', name: 'TechCorp Inc.', email: 'admin@techcorp.com', location: 'San Francisco', projects: 12, status: 'Active' },
  { id: '2', name: 'Digital Solutions', email: 'hello@digisol.com', location: 'London', projects: 8, status: 'Active' },
  { id: '3', name: 'StartupXYZ', email: 'founders@startup.io', location: 'Berlin', projects: 5, status: 'Active' },
  { id: '4', name: 'Global Ent.', email: 'hq@global.com', location: 'Tokyo', projects: 3, status: 'Inactive' },
];

const ClientMaster: React.FC = () => {
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', location: '' });

  const toggleStatus = (id: string) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c));
  };

  const handleOpenAdd = () => {
    setEditingClient(null);
    setFormData({ name: '', email: '', location: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (client: any) => {
    setEditingClient(client);
    setFormData({ name: client.name, email: client.email, location: client.location });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove this client?')) {
      setClients(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.name) return;
    if (editingClient) {
      setClients(prev => prev.map(c => c.id === editingClient.id ? { ...c, ...formData } : c));
    } else {
      setClients([...clients, { ...formData, id: Date.now().toString(), status: 'Active', projects: 0 }]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 md:p-8 w-full bg-[#f8fbff] min-h-full animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1.5">Client Master</h1>
          <p className="text-slate-400 text-xs font-medium tracking-tight">Enterprise organization database.</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-primary text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Building2 size={14} strokeWidth={3} /> Add Client
        </button>
      </div>

      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">HQ</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {clients.map(client => (
              <tr key={client.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                     <div className="size-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
                        <Globe size={14} />
                     </div>
                     <div className="flex flex-col min-w-0">
                        <span className="text-slate-900 font-bold text-xs tracking-tight truncate">{client.name}</span>
                        <span className="text-slate-400 font-medium text-[9px] truncate">{client.email}</span>
                     </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px]">
                      <MapPin size={10} />
                      {client.location}
                   </div>
                </td>
                <td className="px-6 py-4">
                   <button 
                    onClick={() => toggleStatus(client.id)}
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${client.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                   >
                      <div className={`size-1 rounded-full ${client.status === 'Active' ? 'bg-emerald-500 shadow-sm' : 'bg-slate-300'}`} />
                      {client.status}
                   </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => handleOpenEdit(client)} className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(client.id)} className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
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
            <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase mb-6">{editingClient ? 'Update Org' : 'New Client'}</h3>
            <div className="space-y-4">
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Org Name</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:bg-white focus:border-primary" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
               </div>
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Admin Email</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:bg-white focus:border-primary" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
               </div>
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">HQ City</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:bg-white focus:border-primary" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
               </div>
               <div className="flex gap-3 pt-3">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-3 text-[10px] font-black uppercase text-slate-400 hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
                  <button onClick={handleSubmit} className="flex-1 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase shadow-lg shadow-primary/20">Finalize</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientMaster;
