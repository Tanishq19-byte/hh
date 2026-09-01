import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle,
  Search,
  Building2,
  ShieldCheck,
  Calendar,
  MapPin,
  Clock,
  AlertTriangle,
  Info,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { apiService } from '../services/api';

export const Verify = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('license') || '10015011002345');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async (searchTerm = query) => {
    if (!searchTerm || searchTerm.trim().length === 0) return;
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await apiService.verifyBusiness(searchTerm);
      if (res && res.data) {
        setSearchResult(res);
      } else {
        setErrorMsg('No FSSAI licence match found in demo dataset.');
      }
    } catch (err) {
      setErrorMsg('Failed to verify licence data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      handleVerify(query);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>FSSAI Business Verification Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Verify Food Business Licence
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Enter a 14-digit FSSAI licence number, company name, or brand to inspect official registration status and validity details.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow space-y-4">
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify();
          }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Enter 14-digit FSSAI License # (e.g. 10015011002345) or Business Name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all shrink-0"
          >
            {isLoading ? 'Verifying...' : 'Verify Licence'}
          </button>
        </form>

        {/* Quick Demo Preset Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t text-xs">
          <span className="text-slate-500 font-semibold">Try Demo Licences:</span>
          <button
            onClick={() => { setQuery('10015011002345'); handleVerify('10015011002345'); }}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-800 text-[11px] font-mono border"
          >
            10015011002345 (Active Manufacturer)
          </button>
          <button
            onClick={() => { setQuery('10018043004567'); handleVerify('10018043004567'); }}
            className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-mono border border-amber-300"
          >
            10018043004567 (Under Review)
          </button>
          <button
            onClick={() => { setQuery('10019011009999'); handleVerify('10019011009999'); }}
            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 text-[11px] font-mono border border-rose-300"
          >
            10019011009999 (Suspended)
          </button>
        </div>

      </div>

      {/* RESULTS DISPLAY */}
      {searchResult && searchResult.data && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow space-y-6 animate-in fade-in duration-200">
          
          {/* DEMO VERIFICATION DATA DISCLAIMER BADGE (SPEC REQUIREMENT) */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="font-bold">Demo Verification Data</span>
                <span className="ml-1 text-amber-800">
                  — Displaying simulated hackathon verification record. Official government API status is simulated.
                </span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-extrabold uppercase shrink-0">
              Prototype Mode
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">FSSAI Licence Reference</span>
              <h2 className="text-2xl font-mono font-extrabold text-slate-900">
                {searchResult.data.licenseNumber}
              </h2>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>{searchResult.data.businessName}</span>
              </h3>
            </div>

            {/* Status Seal */}
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="text-xs text-slate-500 font-medium">Licence Status</span>
              <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold border shadow-xs ${
                searchResult.data.status === 'Active'
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : searchResult.data.status === 'Under Review'
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-rose-50 text-rose-900 border-rose-300'
              }`}>
                {searchResult.data.status === 'Active' && '🟢 '}
                {searchResult.data.status === 'Under Review' && '🟡 '}
                {searchResult.data.status === 'Suspended' && '🔴 '}
                {searchResult.data.status}
              </span>
            </div>
          </div>

          {/* Detailed Verification Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider text-slate-500">Business Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Category</span>
                  <span className="font-bold text-slate-900">{searchResult.data.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Registered State</span>
                  <span className="font-semibold text-slate-800">{searchResult.data.state || 'Delhi NCR'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Registered Premises Address</span>
                  <p className="font-medium text-slate-800 bg-white p-2.5 rounded-lg border">{searchResult.data.address}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider text-slate-500">Licence Timeline & Audit</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Issued Date</span>
                  <span className="font-semibold text-slate-800">{searchResult.data.issuedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expiry Date</span>
                  <span className="font-bold text-emerald-800">{searchResult.data.expiryDate}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-slate-500">Verification Timestamp</span>
                  <span className="font-mono text-slate-600 text-[11px]">
                    {new Date(searchResult.data.verificationTimestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-semibold text-center">
          {errorMsg}
        </div>
      )}

    </div>
  );
};
