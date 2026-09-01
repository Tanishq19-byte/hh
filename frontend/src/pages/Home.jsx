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
  FileSearch
} from 'lucide-react';
import { DEMO_PRESET_SCANS } from '../data/presetData';
import { useApp } from '../context/AppContext';

export const Home = () => {
  const navigate = useNavigate();
  const { setCurrentScan } = useApp();
  const [activeDemoTab, setActiveDemoTab] = useState('noodle');

  const journeySteps = [
    { step: '01', title: 'SCAN', desc: 'Capture or upload food label images with camera OCR', icon: Scan, color: 'emerald' },
    { step: '02', title: 'UNDERSTAND', desc: 'Demystify additives, E-numbers & nutritional facts', icon: FileSearch, color: 'teal' },
    { step: '03', title: 'VERIFY', desc: 'Check 14-digit FSSAI licence validity and vendor records', icon: CheckCircle, color: 'emerald' },
    { step: '04', title: 'DETECT', desc: 'Cross-reference active recall notices & adulteration signs', icon: AlertTriangle, color: 'amber' },
    { step: '05', title: 'REPORT', desc: 'File guided evidence-backed consumer safety reports', icon: FileText, color: 'blue' },
    { step: '06', title: 'ACT', desc: 'Track resolution status & safeguard your family’s health', icon: ShieldCheck, color: 'green' },
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
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>AI-Powered Consumer Food Transparency Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              See Beyond <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
                the Label.
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
                <span>Scan Food Label</span>
              </Link>

              <Link
                to="/verify"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 backdrop-blur-sm transition-all hover:border-white/40"
              >
                <CheckCircle className="w-5 h-5 text-emerald-300" />
                <span>Verify FSSAI Product</span>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-emerald-800/80 grid grid-cols-3 gap-6 max-w-lg text-emerald-100/80">
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-emerald-200/70 font-medium">Fact-Based E-Codes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">14-Digit</div>
                <div className="text-xs text-emerald-200/70 font-medium">FSSAI Licence Lookup</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">Guided</div>
                <div className="text-xs text-emerald-200/70 font-medium">Evidence Reporting</div>
              </div>
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
                  <span className="text-xs text-slate-400 font-mono ml-2">Live OCR Preview</span>
                </div>
                <span className="text-[11px] font-semibold bg-emerald-950 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-800">
                  Interactive Demo
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
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    DEMO_PRESET_SCANS[activeDemoTab].overallStatus === 'Good'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : DEMO_PRESET_SCANS[activeDemoTab].overallStatus === 'Needs Attention'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}>
                    {DEMO_PRESET_SCANS[activeDemoTab].overallStatus}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between text-slate-400 border-t border-slate-800/80 pt-2">
                    <span>Extracted Additives:</span>
                    <span className="font-semibold text-emerald-400">
                      {DEMO_PRESET_SCANS[activeDemoTab].additives.length > 0 
                        ? DEMO_PRESET_SCANS[activeDemoTab].additives.map(a => a.code).join(', ')
                        : 'No additives flagged'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 italic line-clamp-2">
                    "{DEMO_PRESET_SCANS[activeDemoTab].explanation}"
                  </p>
                </div>

                <button
                  onClick={handleViewScanDemo}
                  className="w-full py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Explore Full AI Analysis</span>
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
            SCAN → UNDERSTAND → VERIFY → DETECT → REPORT → ACT
          </p>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            FoodVigil bridges the gap between complex food labels, scattered safety warnings, and actionable consumer reporting.
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

      {/* WHY KHADYADARPAN / FOODVIGIL */}
      <section className="bg-emerald-900/5 border-y border-emerald-900/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Solving Real Consumer Safety Challenges</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Why FoodVigil (KhadyaDarpan)?</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We don't just tell consumers what's in their food. We help them understand ingredients, verify licenses, recognize adulteration risks, and file structured evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <FileSearch className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Understand Complex Labels</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Translate obscure E-numbers (like E621, E102) and chemical codes into plain, non-alarmist consumer guidance.
              </p>
              <Link to="/scan" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-2">
                <span>Try Label Scanner</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Verify Food Information</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instantly check 14-digit FSSAI licence status, vendor registration category, and validity timestamps.
              </p>
              <Link to="/verify" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-2">
                <span>Verify FSSAI Licence</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Stay Aware of Recalls</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stay updated with food safety recalls, allergen advisories, and official government advisories in one central hub.
              </p>
              <Link to="/alerts" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-2">
                <span>Browse Active Recalls</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Learn About Adulteration</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Spot preliminary warning signs in milk, spices, oils, and sweets with clear scientific boundaries & disclaimers.
              </p>
              <Link to="/spot-the-risk" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-2">
                <span>Open "Spot the Risk"</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Report Suspicious Products</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Follow a guided checklist to collect receipts, batch numbers, and label photos before generating a structured report.
              </p>
              <Link to="/report" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-2">
                <span>File Safety Issue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Secure Evidence Vault</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Organize purchase bills, label snapshots, and batch details in your personal dashboard for consumer tracking.
              </p>
              <Link to="/evidence" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline pt-2">
                <span>View Evidence Vault</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-gradient rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to scan your first product label?</h2>
            <p className="text-sm text-emerald-100/90">
              Upload a packaging photo or choose from pre-loaded demo labels to experience AI label analysis in action.
            </p>
          </div>
          <Link
            to="/scan"
            className="px-8 py-4 rounded-xl bg-white text-emerald-950 font-extrabold text-sm shadow-lg hover:bg-emerald-50 transition-transform active:scale-95 shrink-0"
          >
            Launch Camera Scanner
          </Link>
        </div>
      </section>

    </div>
  );
};
