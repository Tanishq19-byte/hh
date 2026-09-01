import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, AlertCircle, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">
                Food<span className="text-emerald-400">Vigil</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-powered consumer food safety and transparency platform. Empowering Indian consumers to scan, verify, spot risks, and report safety issues.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/40 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Platform Status: Operational</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Features</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/scan" className="hover:text-emerald-400 transition-colors">AI Label Scanner</Link></li>
              <li><Link to="/verify" className="hover:text-emerald-400 transition-colors">FSSAI License Verification</Link></li>
              <li><Link to="/alerts" className="hover:text-emerald-400 transition-colors">Food Recall Radar</Link></li>
              <li><Link to="/spot-the-risk" className="hover:text-emerald-400 transition-colors">Spot the Risk Guide</Link></li>
              <li><Link to="/report" className="hover:text-emerald-400 transition-colors">Report Food Safety Issue</Link></li>
            </ul>
          </div>

          {/* Consumer Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Consumer Hub</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/evidence" className="hover:text-emerald-400 transition-colors">Evidence Vault</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">My Safety Dashboard</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">Trust & Safety Guidelines</Link></li>
              <li>
                <a 
                  href="https://fssai.gov.in" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Official FSSAI Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Safety & Compliance Notice */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Important Notice</h4>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400 leading-normal space-y-2">
              <div className="flex items-start gap-1.5 text-amber-400 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Consumer Awareness Tool</span>
              </div>
              <p>
                FoodVigil provides AI-assisted label explanations and public recall tracking. Visual checks & home tests are preliminary awareness steps and do not replace certified accredited laboratory analysis.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 FoodVigil Platform — KhadyaDarpan Initiative. Built for Hackathon Excellence.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Built with React 18, Vite & Node</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
