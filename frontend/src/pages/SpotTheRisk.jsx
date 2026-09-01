import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldCheck,
  FlaskConical,
  ChevronRight,
  Info,
  Check,
  AlertOctagon
} from 'lucide-react';
import { ADULTERATION_GUIDES } from '../data/presetData';

export const SpotTheRisk = () => {
  const [selectedCategory, setSelectedCategory] = useState(ADULTERATION_GUIDES[0].id);

  const activeGuide = ADULTERATION_GUIDES.find(g => g.id === selectedCategory) || ADULTERATION_GUIDES[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold">
          <Eye className="w-4 h-4 text-teal-700" />
          <span>Consumer Adulteration Awareness</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Spot the Risk: Food Purity Guide
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Learn preliminary visual indicators, warning signs, and safe consumer practices across everyday food categories.
        </p>
      </div>

      {/* MANDATORY SCIENTIFIC DISCLAIMER BANNER (SPEC REQUIREMENT) */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <FlaskConical className="w-5 h-5 text-amber-700 shrink-0" />
          <span>Scientific Boundaries & Laboratory Testing Disclaimer</span>
        </div>
        <p className="text-xs leading-relaxed text-amber-900/90">
          <strong>Important Note:</strong> Visual checks and home spot tests (such as water dissolution or iodine drops) are strictly <strong>preliminary consumer awareness tools</strong>. They do not constitute legally definitive scientific proof of adulteration. Official legal action or evidentiary proof requires certified NABL/FSSAI accredited laboratory testing.
        </p>
      </div>

      {/* CATEGORY SELECTOR CAROUSEL */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {ADULTERATION_GUIDES.map((guide) => (
          <button
            key={guide.id}
            onClick={() => setSelectedCategory(guide.id)}
            className={`p-3.5 rounded-2xl text-center border-2 transition-all space-y-1.5 ${
              selectedCategory === guide.id
                ? 'border-emerald-700 bg-emerald-800 text-white shadow-md'
                : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300'
            }`}
          >
            <div className="text-xs font-bold truncate">{guide.title.split(' ')[0]}</div>
            <div className={`text-[10px] uppercase font-semibold ${selectedCategory === guide.id ? 'text-emerald-200' : 'text-slate-500'}`}>
              {guide.category}
            </div>
          </button>
        ))}
      </div>

      {/* DETAILED CATEGORY GUIDE */}
      <div className="bg-white rounded-3xl border border-slate-200 card-shadow overflow-hidden">
        
        {/* Banner */}
        <div className="relative h-48 sm:h-64 bg-slate-900 overflow-hidden">
          <img
            src={activeGuide.image}
            alt={activeGuide.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 w-fit mb-2">
              {activeGuide.category} Category Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">{activeGuide.title}</h2>
          </div>
        </div>

        {/* Breakdown Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Common Adulterants */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Common Reported Adulterants</h3>
            <div className="flex flex-wrap gap-2">
              {activeGuide.commonAdulterants.map((ad, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                  ⚠️ {ad}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* What to Look For */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>What to Look For</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">{activeGuide.whatToLookFor}</p>
            </div>

            {/* Common Warning Signs */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Preliminary Warning Signs</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {activeGuide.warningSigns.map((sign, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Safe Consumer Practices */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Recommended Safe Consumer Practices</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeGuide.safePractices.map((practice, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                  ✅ {practice}
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-emerald-400">Noticed a suspicious product in market?</h4>
              <p className="text-xs text-slate-300">File a structured consumer report with photo & receipt evidence.</p>
            </div>

            <Link
              to={`/report?category=${activeGuide.category}`}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0"
            >
              Report Suspicious Food Issue
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
