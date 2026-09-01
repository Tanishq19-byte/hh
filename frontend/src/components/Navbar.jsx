import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  Scan,
  CheckCircle,
  AlertTriangle,
  Eye,
  FileText,
  Vault,
  LayoutDashboard,
  Info,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { demoMode, setDemoMode, userProfile } = useApp();

  const navLinks = [
    { name: 'Scan Food', path: '/scan', icon: Scan },
    { name: 'Verify License', path: '/verify', icon: CheckCircle },
    { name: 'Safety Alerts', path: '/alerts', icon: AlertTriangle },
    { name: 'Spot the Risk', path: '/spot-the-risk', icon: Eye },
    { name: 'Report Issue', path: '/report', icon: FileText },
    { name: 'Evidence Vault', path: '/evidence', icon: Vault },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'About', path: '/about', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-emerald-400 shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900 font-sans">
                  Food<span className="text-emerald-700">Vigil</span>
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                  v1.0 Hackathon
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">See Beyond the Label</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-emerald-300' : 'text-slate-500'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar & Demo Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setDemoMode(!demoMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                demoMode
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
              title="Toggle offline preset mode for instant hackathon testing"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Demo Mode: <strong>{demoMode ? 'ON' : 'OFF'}</strong></span>
            </button>

            <Link
              to="/scan"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-sm transition-all hover:shadow-emerald-900/20 active:scale-95"
            >
              <Scan className="w-4 h-4" />
              <span>Scan Food</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="p-2 mb-2 bg-emerald-50 rounded-lg flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-900">Demo Preset Engine</span>
            <button
              onClick={() => setDemoMode(!demoMode)}
              className="px-3 py-1 text-xs font-bold rounded-md bg-emerald-800 text-white"
            >
              {demoMode ? 'Active (Presets)' : 'Live API'}
            </button>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  active
                    ? 'bg-emerald-800 text-white'
                    : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
