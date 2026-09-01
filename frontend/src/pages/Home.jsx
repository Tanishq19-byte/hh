import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Scan,
  CheckCircle,
  Search,
  AlertTriangle,
  Eye,
  FileText,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronRight,
  Check,
  Activity,
  Award,
  Layers,
  FileSearch,
  Cpu,
  Lock,
  Wallet
} from 'lucide-react';
import { DEMO_PRESET_SCANS } from '../data/presetData';
import { useApp } from '../context/AppContext';

export const Home = () => {
  const navigate = useNavigate();
  const { setCurrentScan } = useApp();
  const [activeDemoTab, setActiveDemoTab] = useState('noodle');

  const journeySteps = [
    { step: '01', title: 'SCAN', desc: 'Capture food label images with camera OCR text extraction', icon: Scan },
    { step: '02', title: 'UNDERSTAND', desc: 'Demystify ingredients, E-numbers & nutritional values', icon: FileSearch },
    { step: '03', title: 'VERIFY', desc: 'Check 14-digit FSSAI licence validity & registered records', icon: CheckCircle },
    { step: '04', title: 'INVESTIGATE', desc: 'AI Agent evaluates confidence & requests x402 intelligence', icon: Cpu },
    { step: '05', title: 'REPORT', desc: 'Generate guided evidence-backed consumer safety reports', icon: FileText },
    { step: '06', title: 'ACT', desc: 'Track resolution status & safeguard your family’s health', icon: ShieldCheck },
  ];

  const handleDemoPresetSelect = (key) => {
    setActiveDemoTab(key);
    setCurrentScan(DEMO_PRESET_SCANS[key]);
  };

  const handleViewScanDemo = () => {
    setCurrentScan(DEMO_PRESET_SCANS[activeDemoTab]);
    navigate('/scan/result');
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-brand-gradient text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
              <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Agentic Solutions Track: Powered by x402 on Algorand</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              FOODVIGIL AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
                “See Beyond the Label.”
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-emerald-100/90 max-w-2xl font-normal leading-relaxed">
              Understand what you eat. Verify what you buy. Act when something isn’t right.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/scan"
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Scan className="w-5 h-5" />
                <span>SCAN FOOD</span>
              </Link>

              <Link
                to="/verify"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 backdrop-blur-sm transition-all hover:border-white/40"
              >
                <CheckCircle className="w-5 h-5 text-emerald-300" />
                <span>VERIFY FOOD</span>
              </Link>
            </div>

            {/* Quick Badges */}
            <div className="pt-6 border-t border-emerald-800/80 flex flex-wrap items-center gap-4 text-xs text-emerald-200">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Real x402 Protocol</span>
              <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-emerald-400" /> Algorand Testnet</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> GoPlausible Facilitator</span>
            </div>

          </div>

          {/* Interactive Live Demo Preview Box */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/30 p-6 shadow-2xl backdrop-blur-md space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-slate-400 font-mono ml-2">Agentic x402 Pipeline</span>
                </div>
                <span className="text-[11px] font-semibold bg-emerald-950 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-800">
                  HTTP 402 Active
                </span>
              </div>

              {/* Demo selector tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleDemoPresetSelect('noodle')}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                    activeDemoTab === 'noodle'
                      ? 'bg-emerald-800 text-white border-emerald-500'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  Noodles
                </button>
                <button
                  onClick={() => handleDemoPresetSelect('drink')}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                    activeDemoTab === 'drink'
                      ? 'bg-emerald-800 text-white border-emerald-500'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  Energy Drink
                </button>
                <button
                  onClick={() => handleDemoPresetSelect('adulterated_spice')}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                    activeDemoTab === 'adulterated_spice'
                      ? 'bg-emerald-800 text-white border-emerald-500'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  Spice Recall
                </button>
              </div>

              {/* Sample Card Display */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {DEMO_PRESET_SCANS[activeDemoTab].productName}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Brand: {DEMO_PRESET_SCANS[activeDemoTab].brand} | FSSAI #{DEMO_PRESET_SCANS[activeDemoTab].licenseNumber}
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    x402 Ready
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 italic line-clamp-2">
                  "{DEMO_PRESET_SCANS[activeDemoTab].explanation}"
                </p>

                <button
                  onClick={handleViewScanDemo}
                  className="w-full py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Test Agent Decision & x402 Micropayment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* THE 6-STEP CONSUMER JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-800">Consumer Empowerment Journey</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            SCAN → UNDERSTAND → VERIFY → INVESTIGATE → REPORT → ACT
          </p>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            FoodVigil bridges the gap between complex food labels, scattered safety warnings, and actionable agentic reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journeySteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 card-shadow card-shadow-hover space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 font-mono">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROMPT MANDATED SECTION: POWERED BY X402 ON ALGORAND */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              Agentic Solutions: Powered by x402
            </span>
            <h2 className="text-3xl font-extrabold">Powered by x402 on Algorand</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              FoodVigil uses AI agents and x402 micropayments to access verified food-safety intelligence when deeper analysis is required.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400">1. AI Agent Resource Request</span>
                <p className="text-slate-400">Agent autonomously evaluates confidence and requests verified food intelligence APIs.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400">2. HTTP 402 Challenge</span>
                <p className="text-slate-400">Resource endpoint responds with HTTP 402 Payment Required specifying $0.01 USDC price.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400">3. Algorand Testnet Settlement</span>
                <p className="text-slate-400">Transaction signed via wallet and verified by GoPlausible Facilitator.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400">4. Verified Intelligence Unlocked</span>
                <p className="text-slate-400">GoPlausible settles payment and agent receives confirmed data with live TX hash link.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span>x402 Protocol Flow</span>
            </h3>

            <div className="space-y-2 text-xs font-mono text-slate-300 divide-y divide-slate-800">
              <div className="pt-2 flex justify-between"><span>GET /api/v1/premium/...</span><span className="text-amber-400 font-bold">402 Required</span></div>
              <div className="pt-2 flex justify-between"><span>X-PAYMENT-REQUIRED</span><span className="text-emerald-400 font-bold">$0.01 USDC</span></div>
              <div className="pt-2 flex justify-between"><span>Blockchain Network</span><span className="text-emerald-400 font-bold">Algorand Testnet</span></div>
              <div className="pt-2 flex justify-between"><span>Settlement Facilitator</span><span className="text-emerald-400 font-bold">GoPlausible</span></div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
