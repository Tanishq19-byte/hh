import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Scan,
  FileText,
  Bookmark,
  AlertTriangle,
  Award,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useApp } from '../context/AppContext';

export const Dashboard = () => {
  const { userProfile, reportsList, evidenceVault } = useApp();

  const activityMetrics = [
    { label: 'Products Scanned', count: userProfile.scannedCount, icon: Scan, color: 'emerald' },
    { label: 'Reports Submitted', count: reportsList.length, icon: FileText, color: 'blue' },
    { label: 'Saved Products', count: userProfile.savedProducts, icon: Bookmark, color: 'teal' },
    { label: 'Active Alerts', count: 3, icon: AlertTriangle, color: 'amber' },
  ];

  const scoreProgressData = [
    { month: 'May', score: 62 },
    { month: 'Jun', score: 70 },
    { month: 'Jul', score: 79 },
    { month: 'Aug', score: userProfile.awarenessScore }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Profile Banner */}
      <div className="bg-brand-gradient rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <Award className="w-3.5 h-3.5" />
            <span>Tier: {userProfile.rank || 'Safety Watcher'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome back, {userProfile.name}!
          </h1>
          <p className="text-xs text-emerald-100/80">
            Your consumer food safety activity & transparency overview.
          </p>
        </div>

        {/* FOOD SAFETY AWARENESS SCORE BADGE (ENGAGEMENT METRIC) */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center space-y-1 shrink-0 min-w-[200px]">
          <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider block">
            Awareness Score
          </span>
          <div className="text-4xl font-extrabold text-white font-mono flex items-center justify-center gap-1">
            <span>{userProfile.awarenessScore}</span>
            <span className="text-sm font-normal text-emerald-300">/ 100</span>
          </div>
          <span className="text-[10px] text-emerald-200/70 block italic">
            * Engagement & vigilance metric
          </span>
        </div>

      </div>

      {/* 4 STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {activityMetrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-white rounded-2xl p-5 border border-slate-200 card-shadow space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">{m.label}</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono">{m.count}</div>
            </div>
          );
        })}
      </div>

      {/* ANALYTICS & RECENT ACTIVITY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Awareness Score Trend Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 card-shadow space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-700" />
                <span>Food Safety Awareness Trend</span>
              </h3>
              <p className="text-xs text-slate-500">Monthly consumer engagement index progress</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              +18% Growth
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreProgressData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D5C3A" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0D5C3A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} domain={[50, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="score" stroke="#0D5C3A" strokeWidth={3} fillOpacity={1} fill="url(#scoreGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: Recent Activity Stream */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 card-shadow space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-700" />
            <span>Recent Activity Log</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Scanned Crispy Instant Noodles</p>
                <span className="text-[11px] text-slate-500">Additives: E621 (MSG)</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Today</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Submitted Report FV-2026-88102</p>
                <span className="text-[11px] text-slate-500">Status: Escalated</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Aug 27</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Verified FSSAI #10015011002345</p>
                <span className="text-[11px] text-slate-500">Himalaya Foods Pvt Ltd</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Aug 20</span>
            </div>
          </div>

          <Link
            to="/scan"
            className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Scan New Label</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
};
