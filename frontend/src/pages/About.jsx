import React from 'react';
import { ShieldCheck, Heart, Sparkles, CheckCircle2, Lock, Cpu, Server, Database, AlertCircle } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Platform Mission & Safety Framework</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          About FoodVigil (KhadyaDarpan)
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          Built to empower Indian consumers with AI food label intelligence, verified licence lookups, recall tracking, and evidence reporting.
        </p>
      </div>

      {/* CORE VISION & ETHICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="text-base font-bold text-slate-900">Fact-Based Transparency</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We map food additive codes (E-numbers) directly to statutory regulatory definitions. We never label an ingredient as "dangerous" simply because it is an additive.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="text-base font-bold text-slate-900">No Fear-Mongering</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            AI explanations maintain balanced, objective tone. We clearly distinguish between raw label facts, AI interpretation, and non-medical consumer guidance.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="text-base font-bold text-slate-900">Consumer Action</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We empower consumers to collect receipt & label evidence and generate structured reports for submission to food safety authorities.
          </p>
        </div>

      </div>

      {/* TECHNICAL SYSTEM ARCHITECTURE OVERVIEW */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-400" />
          <span>System Architecture & Data Flow</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase text-emerald-400">1. Frontend Layer</span>
            <p className="font-bold text-white">React 18 + Vite</p>
            <p className="text-slate-400">Responsive UI, Camera OCR lens, Lucide React, Recharts.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase text-teal-400">2. Backend REST API</span>
            <p className="font-bold text-white">Node.js + Express</p>
            <p className="text-slate-400">Controllers for verification, reports, recalls, and evidence.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase text-emerald-400">3. AI Microservice</span>
            <p className="font-bold text-white">FastAPI + OCR</p>
            <p className="text-slate-400">Structured JSON schemas, Gemini engine, rule-based fallback.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase text-amber-400">4. Database</span>
            <p className="font-bold text-white">PostgreSQL / Supabase</p>
            <p className="text-slate-400">Relational schema for products, licences, recalls & evidence.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
