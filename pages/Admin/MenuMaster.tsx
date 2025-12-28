
import React, { useState } from 'react';
import { Folder, Plus, Edit2, Trash2, Code, Check, X } from 'lucide-react';
import { INITIAL_MENUS } from '../../store/adminSlice';
import { MenuItem } from '../../types/admin.types';

const MenuMaster: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>(INITIAL_MENUS);
  const [showModal, setShowModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({ name: '', route: '', displayOrder: 1 });

  const handleOpenAdd = () => {
    setEditingMenu(null);
    setFormData({ name: '', route: '', displayOrder: menus.length + 1 });
    setShowModal(true);
  };

  const handleOpenEdit = (menu: MenuItem) => {
    setEditingMenu(menu);
    setFormData({ name: menu.name, route: menu.route, displayOrder: menu.displayOrder });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove menu item?')) {
      setMenus(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.route) return;
    if (editingMenu) {
      setMenus(prev => prev.map(m => m.id === editingMenu.id ? { ...m, ...formData } : m));
    } else {
      setMenus([...menus, { 
        ...formData, 
        id: Date.now().toString(), 
        icon: 'Folder', 
        parentId: null, 
        status: 'Active' 
      }]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 md:p-8 w-full bg-[#f8fbff] min-h-full animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1.5">Menu Master</h1>
          <p className="text-slate-400 text-xs font-medium">Control navigation and route mapping.</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-primary text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
          <Plus size={14} strokeWidth={3} /> Add Menu
        </button>
      </div>

      <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Target Route</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {menus.map(menu => (
              <tr key={menu.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <Folder className="text-emerald-400" size={14} />
                    <span className="text-slate-900 font-bold text-xs tracking-tight">{menu.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded border border-slate-100 w-fit">
                      <Code size={10} className="text-slate-400" />
                      <span className="text-slate-500 font-mono text-[9px]">{menu.route}</span>
                   </div>
                </td>
                <td className="px-6 py-4">
                   <span className="text-slate-900 font-black text-xs">{menu.displayOrder}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => handleOpenEdit(menu)} className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(menu.id)} className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
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
            <h3 className="text-sm font-black text-slate-800 tracking-tight uppercase mb-6">{editingMenu ? 'Edit Menu' : 'New Node'}</h3>
            <div className="space-y-4">
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Item Label</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:bg-white focus:border-primary" placeholder="e.g. Analytics" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
               </div>
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Route Path</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-[9px] font-mono outline-none focus:bg-white focus:border-primary" placeholder="/admin/path" value={formData.route} onChange={(e) => setFormData({...formData, route: e.target.value})} />
               </div>
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Order</label>
                  <input type="number" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:bg-white focus:border-primary" value={formData.displayOrder} onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value)})} />
               </div>
               <div className="flex gap-3 pt-3">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-3 text-[10px] font-black uppercase text-slate-400 hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
                  <button onClick={handleSubmit} className="flex-1 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase shadow-lg shadow-primary/20">Append</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuMaster;
