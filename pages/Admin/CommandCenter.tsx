
import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, ShieldCheck, Zap, Server, Trash2, RotateCw, Play, Circle, Code2 } from 'lucide-react';

const CommandCenter: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Booting Command Center v4.2.0...',
    '[AUTH] Super Admin verified session UID-90231',
    '[NETWORK] Established socket to US-EAST-1 cluster',
    '[READY] System online. Waiting for command...'
  ]);
  const [inputValue, setInputValue] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newLogs = [...logs, `> ${inputValue}`];
    
    // Simple command simulation
    if (inputValue.toLowerCase() === 'clear') {
      setLogs(['[SYSTEM] Terminal buffer cleared.']);
    } else if (inputValue.toLowerCase() === 'status') {
      newLogs.push('[STATUS] RAM: 8.2GB/16GB | CPU: 12% | DISK: 45%');
      newLogs.push('[STATUS] Clusters: 3/3 Healthy');
    } else {
      newLogs.push(`[ERROR] Command '${inputValue}' not recognized. Try 'status' or 'clear'.`);
    }

    setLogs(newLogs);
    setInputValue('');
  };

  return (
    <div className="p-10 lg:p-14 pb-24 w-full bg-[#0a0f18] min-h-full font-mono text-slate-300">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white mb-3 tracking-tighter flex items-center gap-4">
          <TerminalIcon className="text-indigo-500" size={40} />
          System Command Center
        </h1>
        <p className="text-slate-500 font-medium text-lg">Direct access to core services and automation scripts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Main Terminal Window */}
        <div className="lg:col-span-3 flex flex-col h-[600px] bg-slate-950 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-white/5">
             <div className="flex gap-2">
                <div className="size-3 rounded-full bg-rose-500" />
                <div className="size-3 rounded-full bg-amber-500" />
                <div className="size-3 rounded-full bg-emerald-500" />
             </div>
             <div className="flex items-center gap-3">
                <Code2 size={16} className="text-slate-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">tty01 / admin-session</span>
             </div>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto space-y-2 font-mono text-sm leading-relaxed scrollbar-hide">
             {logs.map((log, i) => (
               <div key={i} className={`${log.startsWith('>') ? 'text-indigo-400' : log.startsWith('[ERROR]') ? 'text-rose-400' : 'text-slate-300'}`}>
                 {log}
               </div>
             ))}
             <div ref={logEndRef} />
          </div>

          <form onSubmit={handleCommand} className="bg-slate-900 px-8 py-6 flex items-center gap-4 border-t border-white/5">
             <span className="text-indigo-500 font-black">❯</span>
             <input 
               autoFocus
               type="text" 
               className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder-slate-700"
               placeholder="Enter system command..."
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
             />
          </form>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-1 flex flex-col gap-8">
           <div className="bg-slate-900 rounded-[2rem] p-8 border border-white/5 space-y-8">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-4">Service Controls</h3>
              <div className="space-y-4">
                 <ServiceToggle label="API Server" status="Running" icon={Zap} color="text-emerald-500" />
                 <ServiceToggle label="Cron Jobs" status="Running" icon={RotateCw} color="text-indigo-500" />
                 <ServiceToggle label="Web Sockets" status="Stopped" icon={Circle} color="text-slate-500" />
                 <ServiceToggle label="Email Queue" status="Paused" icon={Play} color="text-amber-500" />
              </div>
           </div>

           <div className="bg-rose-500/10 rounded-[2rem] p-8 border border-rose-500/20 group cursor-pointer hover:bg-rose-500/20 transition-all">
              <div className="flex items-center gap-4 mb-4">
                 <Trash2 className="text-rose-500" />
                 <h4 className="text-rose-500 font-black text-sm uppercase tracking-widest">Danger Zone</h4>
              </div>
              <p className="text-xs text-rose-300/60 leading-relaxed font-bold">
                Clear all cache buffers and force system-wide log rotation. Requires secondary key.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

const ServiceToggle = ({ label, status, icon: Icon, color }: any) => (
  <div className="flex items-center justify-between group">
     <div className="flex items-center gap-3">
        <Icon size={16} className={color} />
        <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">{label}</span>
     </div>
     <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${color} bg-white/5`}>{status}</span>
  </div>
);

export default CommandCenter;
