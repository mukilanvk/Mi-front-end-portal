
import React from 'react';
import { 
  Users, 
  LayoutDashboard, 
  CheckCircle2, 
  Globe, 
  TrendingUp, 
  AlertCircle, 
  Clock,
  MoreHorizontal
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 md:p-8 w-full bg-[#f8fbff] min-h-full animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Overview</h1>
        <p className="text-slate-400 text-sm font-medium tracking-tight">Welcome back! Real-time snapshot of the platform.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Total Clients" value="24" trend="+12% vs LY" icon={Globe} color="bg-emerald-500" />
        <StatCard label="Total Boards" value="67" trend="+8% vs LY" icon={LayoutDashboard} color="bg-primary" />
        <StatCard label="Total Members" value="156" trend="+5% vs LY" icon={Users} color="bg-emerald-500" />
        <StatCard label="Total Tasks" value="1,234" trend="+15% vs LY" icon={CheckCircle2} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Task Completion Trend</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly performance overview</p>
            </div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-lg">+23% this month</span>
          </div>
          <div className="h-56 flex items-end gap-3 px-2">
             {[45, 80, 55, 90, 75, 100, 60, 85].map((h, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="w-full bg-emerald-400/90 rounded-lg transition-all duration-700 hover:bg-emerald-500 shadow-sm" style={{ height: `${h}%` }} />
                  <span className="text-[9px] font-black text-slate-300 uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A'][i]}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="lg:col-span-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 tracking-tight mb-6">Board Status</h3>
          <div className="relative size-40 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1085f9" strokeDasharray="60 251.2" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeDasharray="30 251.2" strokeDashoffset="-65" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeDasharray="10 251.2" strokeDashoffset="-100" strokeWidth="12" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-xl font-black text-slate-900">67</span>
            </div>
          </div>
          <div className="space-y-3">
             <StatusRow label="Active" value="45" color="bg-primary" />
             <StatusRow label="Completed" value="15" color="bg-emerald-500" />
             <StatusRow label="Archived" value="7" color="bg-accent-purple" />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">System Logs</h3>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest">Full Log</button>
           </div>
           <div className="space-y-4">
              <LogItem title='E-commerce Redesign' action="Created" user="John D." time="2h ago" />
              <LogItem title="Sarah Wilson" action="Joined" user="Admin" time="5h ago" />
              <LogItem title='Setup CI/CD' action="Completed" user="Mike J." time="Yesterday" />
           </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-4">
           <AlertCard count="18" label="Overdue Tasks" color="rose" />
           <AlertCard count="45" label="Active Boards" color="emerald" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group hover:shadow-lg transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className={`size-10 rounded-xl ${color} flex items-center justify-center text-white shadow-lg shadow-primary/10`}>
        <Icon size={20} />
      </div>
      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{trend}</span>
    </div>
    <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black text-slate-800">{value}</p>
  </div>
);

const StatusRow = ({ label, value, color }: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className={`size-2 rounded-full ${color}`} />
      <span className="text-xs font-bold text-slate-600">{label}</span>
    </div>
    <span className="text-xs font-black text-slate-800">{value}</span>
  </div>
);

const LogItem = ({ title, action, user, time }: any) => (
  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
    <div className="flex flex-col">
       <span className="text-xs font-bold text-slate-800">{title}</span>
       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{action} by {user}</span>
    </div>
    <span className="text-[9px] font-bold text-slate-300 uppercase">{time}</span>
  </div>
);

const AlertCard = ({ count, label, color }: any) => (
  <div className={`p-6 rounded-3xl border border-${color}-100 bg-${color}-50 flex items-center justify-between`}>
     <div className="flex flex-col">
        <span className={`text-${color}-600 text-xl font-black`}>{count}</span>
        <span className={`text-${color}-400 text-[9px] font-black uppercase tracking-widest`}>{label}</span>
     </div>
     <div className={`size-8 rounded-lg bg-${color}-500/20 text-${color}-600 flex items-center justify-center`}>
        <AlertCircle size={18} />
     </div>
  </div>
);

export default AdminDashboard;
