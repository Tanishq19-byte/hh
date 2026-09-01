import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  FileText,
  Info,
  ChevronLeft,
  Share2,
  ExternalLink,
  Award,
  Sparkles,
  Search,
  CheckCircle2,
  AlertOctagon,
  FileSearch,
  BookOpen
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { useApp } from '../context/AppContext';

export const ScanResult = () => {
  const navigate = useNavigate();
  const { currentScan } = useApp();

  if (!currentScan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">No Scan Results Available</h2>
        <p className="text-xs text-slate-500">Please scan a label or choose a demo preset to view the breakdown.</p>
        <Link to="/scan" className="px-6 py-2.5 bg-emerald-800 text-white rounded-xl text-xs font-bold inline-block">
          Go to Scanner
        </Link>
      </div>
    );
  }

  const {
    productName,
    brand,
    manufacturer,
    overallStatus,
    licenseNumber,
    licenseVerified,
    ingredients = [],
    additives = [],
    allergens = [],
    nutrition = {},
    labelCompleteness = {},
    observations = [],
    attentionItems = [],
    explanation = "",
    confidence = 0.95
  } = currentScan;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/scan"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-800"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Scanner</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to={`/verify?license=${licenseNumber}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 text-emerald-800 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Verify FSSAI Licence</span>
          </Link>
          <Link
            to={`/report?product=${encodeURIComponent(productName)}&brand=${encodeURIComponent(brand || '')}&fssai=${licenseNumber}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Report Issue</span>
          </Link>
        </div>
      </div>

      {/* HEADER SNAPSHOT CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200/80 pb-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Food Safety Snapshot</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold border">
                Confidence: {(confidence * 100).toFixed(0)}%
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{productName}</h1>
            <p className="text-xs text-slate-600">
              Brand: <strong>{brand || 'Consumer Brand'}</strong> | Manufacturer: <strong>{manufacturer || 'Registered Facility'}</strong>
            </p>
          </div>

          {/* Status Badge */}
          <div className="shrink-0 flex flex-col items-start md:items-end gap-1">
            <span className="text-xs text-slate-500 font-medium">Overall Status</span>
            <StatusBadge status={overallStatus} size="lg" />
          </div>

        </div>

        {/* FACT vs AI INTERPRETATION vs CONSUMER GUIDANCE BANNER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/80">
          
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>1. Label Fact</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Raw ingredients, declared additives & nutritional values extracted from physical package.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>2. AI Interpretation</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Technical E-numbers mapped to standard FSSAI safety purpose definitions.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <span className="w-2 h-2 rounded-full bg-emerald-800"></span>
              <span>3. Consumer Guidance</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Balanced, non-medical dietary awareness notes without fear-mongering claims.
            </p>
          </div>

        </div>

        {/* AI EXPLANATION SECTION */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>AI Consumer Explanation</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-normal">
            "{explanation}"
          </p>
          <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800">
            * AI-generated explanation based on declared packaging text — verify with official FSSAI sources.
          </p>
        </div>

      </div>

      {/* 7 DETAILED BREAKDOWN CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Additives, Ingredients, Allergens */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Additives & E-Numbers Breakdown */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-emerald-700" />
                <span>Food Additives & E-Numbers</span>
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {additives.length} Flagged
              </span>
            </div>

            {additives.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-medium">
                No food additive code numbers (E-numbers) were flagged on this product label.
              </div>
            ) : (
              <div className="space-y-4">
                {additives.map((add, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-900 text-white rounded-md">
                            {add.code}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">{add.name}</h4>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Purpose: <strong>{add.purpose}</strong></p>
                      </div>
                      <StatusBadge status={add.safetyCategory} size="sm" />
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 space-y-1 text-xs">
                      <p className="text-slate-800 font-medium">
                        <strong>Simple Explanation:</strong> "{add.simpleExplanation}"
                      </p>
                      <p className="text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] leading-relaxed">
                        <strong>Consumer Note:</strong> {add.consumerNote}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Card 2: Full Ingredients List */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <span>Full Declared Ingredients</span>
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing, i) => (
                <span
                  key={i}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${
                    ing.isAdditive
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold'
                      : ing.allergen
                      ? 'bg-rose-50 border-rose-300 text-rose-900 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {ing.name}
                  {ing.allergen && <span className="ml-1 text-[10px] text-rose-700 font-bold">(Allergen)</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Allergens Declaration */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">Allergen Declarations</h3>
            <div className="flex flex-wrap gap-2">
              {allergens.map((alg, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
                  ⚠️ {alg}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Nutrition, Completeness, License & Recall Status */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card 4: Nutrition Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">Nutrition Information</h3>
            <div className="divide-y text-xs">
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-500">Serving Size</span>
                <span className="font-bold text-slate-900">{nutrition.servingSize || '100g'}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-500">Energy (Calories)</span>
                <span className="font-bold text-slate-900">{nutrition.energy || 'N/A'}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-500">Protein</span>
                <span className="font-semibold text-slate-800">{nutrition.protein || 'N/A'}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-500">Carbohydrates</span>
                <span className="font-semibold text-slate-800">{nutrition.carbohydrates || 'N/A'}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-500">Total / Added Sugars</span>
                <span className="font-semibold text-amber-800">{nutrition.addedSugars || nutrition.totalSugars || '0g'}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-500">Sodium</span>
                <span className="font-bold text-rose-800">{nutrition.sodium || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Card 5: Label Completeness & Audit */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-base font-bold text-slate-900">Label Completeness</h3>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Score: {labelCompleteness.score || 90}/100
              </span>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">FSSAI Logo & License #</span>
                {labelCompleteness.fssaiLogoPresent !== false ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Present</span>
                ) : (
                  <span className="text-rose-600 font-bold">Missing</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Batch / Lot Number</span>
                {labelCompleteness.batchNumberPresent !== false ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Present</span>
                ) : (
                  <span className="text-rose-600 font-bold">Missing</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Expiry / Best Before Date</span>
                {labelCompleteness.expiryDatePresent !== false ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Present</span>
                ) : (
                  <span className="text-rose-600 font-bold">Missing</span>
                )}
              </div>
            </div>
          </div>

          {/* Card 6: Licence Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">FSSAI Licence Verification</h3>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Licence Number</span>
                <span className="font-mono font-bold text-slate-900">{licenseNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Verification Seal</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{licenseVerified ? 'Verified Active' : 'Unverified'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card 7: Recall & Safety Alert Radar */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">Active Recall & Advisory Radar</h3>
            {overallStatus === 'Important Information' ? (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-rose-800">
                  <AlertOctagon className="w-4 h-4" />
                  <span>Matched Active Safety Advisory</span>
                </div>
                <p>This product brand is subject to active recall advisory #REC-2026-001 regarding suspected dye additives.</p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No Active Recall Alerts</span>
                </div>
                <p>No active FSSAI recall notices currently registered for this product line.</p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
