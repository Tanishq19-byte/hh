import React, { useState } from 'react';
import { Vault, ShieldCheck, FileText, Image, FileCode, AlertCircle, Eye, Download, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EvidenceVault = () => {
  const { evidenceVault } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-emerald-400 text-xs font-bold border border-slate-800">
          <Lock className="w-3.5 h-3.5" />
          <span>Encrypted Evidence Storage Vault</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          My Evidence Vault
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Secure personal repository storing product packaging snapshots, store bills, receipts, and label evidence.
        </p>
      </div>

      {/* SPEC MANDATED DISCLAIMER BANNER */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          <span>Evidentiary & Legal Notice</span>
        </div>
        <p className="text-amber-900/90 leading-relaxed">
          <strong>Notice:</strong> The Evidence Vault serves as a personal consumer record repository to assist in filing FSSAI grievance reports. Storage of files does not guarantee courtroom legal admissibility or certified evidentiary status without formal forensic chain of custody.
        </p>
      </div>

      {/* EVIDENCE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {evidenceVault.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 card-shadow overflow-hidden space-y-3">
            
            <div className="h-44 bg-slate-950 relative overflow-hidden group">
              <img
                src={item.previewUrl}
                alt={item.fileName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <span className="absolute top-3 left-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900/90 text-emerald-400 border border-slate-700">
                {item.id}
              </span>
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white">
                {item.fileType}
              </span>
            </div>

            <div className="p-5 pt-0 space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
                <span>File: <strong className="text-slate-800 font-sans">{item.fileName}</strong></span>
                <span>{item.fileSize}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t text-slate-600">
                <span>Related Report:</span>
                <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {item.relatedReport}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span>Uploaded Date:</span>
                <span className="font-medium">{item.uploadDate}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
