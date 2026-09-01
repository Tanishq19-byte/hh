import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, Clock, MapPin, Tag, Plus, CheckCircle2, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MyReports = () => {
  const { reportsList } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">My Consumer Reports</h1>
          <p className="text-xs text-slate-500 mt-1">Track submitted food safety issues and regulatory referral status.</p>
        </div>

        <Link
          to="/report"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs shadow-sm hover:bg-emerald-900 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Safety Report</span>
        </Link>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reportsList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-xs text-slate-500 border">
            No reports filed yet. Click "New Safety Report" to create your first report.
          </div>
        ) : (
          reportsList.map((rep) => (
            <div key={rep.reportReference} className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      Ref: {rep.reportReference}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                      {rep.issueType}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{rep.productName}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200">
                    Status: {rep.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>Manufacturer: <strong className="text-slate-800">{rep.businessName || rep.brand || 'Unspecified'}</strong></div>
                <div>Location: <strong className="text-slate-800">{rep.location || 'Recorded'}</strong></div>
                <div>FSSAI #: <strong className="text-slate-800 font-mono">{rep.fssaiNumber || 'N/A'}</strong></div>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                "{rep.description}"
              </p>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t">
                <span>Filed Date: <strong>{new Date(rep.createdAt).toLocaleDateString()}</strong></span>
                <Link to="/evidence" className="text-emerald-800 font-bold hover:underline inline-flex items-center gap-1">
                  <span>View Evidence Vault ({rep.evidenceCount || 3} Files)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
