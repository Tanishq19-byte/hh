import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, ExternalLink, Cpu, Loader2 } from 'lucide-react';

export const X402PaymentTracker = ({ status, txData }) => {
  // Statuses: 'idle' | 'required' | 'signing' | 'submitted' | 'settling' | 'unlocked'

  const steps = [
    { key: 'required', label: 'HTTP 402 Required', desc: 'Resource requires x402 payment challenge' },
    { key: 'signing', label: 'Wallet Signature', desc: 'Algorand Testnet signature requested' },
    { key: 'submitted', label: 'Payment Submitted', desc: 'Transaction sent to Algorand Testnet' },
    { key: 'settling', label: 'GoPlausible Settlement', desc: 'Facilitator verifying & settling payment' },
    { key: 'unlocked', label: 'Intelligence Unlocked', desc: 'Verified food-safety data delivered' }
  ];

  const getStepIndex = (key) => {
    switch (key) {
      case 'required': return 0;
      case 'signing': return 1;
      case 'submitted': return 2;
      case 'settling': return 3;
      case 'unlocked': return 4;
      default: return -1;
    }
  };

  const currentIndex = getStepIndex(status);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-5">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">LIVE x402 AGENTIC TRANSACTION TRACKER</h3>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
          Algorand Testnet + GoPlausible
        </span>
      </div>

      {/* Progress Lifecycle Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {steps.map((stepItem, idx) => {
          const isDone = idx < currentIndex || status === 'unlocked';
          const isCurrent = idx === currentIndex && status !== 'unlocked';
          return (
            <div
              key={stepItem.key}
              className={`p-3 rounded-xl border transition-all text-xs space-y-1 ${
                isDone
                  ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                  : isCurrent
                  ? 'bg-amber-950/80 border-amber-500/60 text-amber-300 animate-pulse'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold">Step 0{idx + 1}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {isCurrent && <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />}
              </div>
              <p className="font-bold text-[11px] leading-tight">{stepItem.label}</p>
              <p className="text-[10px] opacity-80">{stepItem.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Settled Transaction Metadata */}
      {txData && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Verified & Settled via GoPlausible
            </span>
            <span className="font-mono text-emerald-300 font-bold">$0.01 USDC (0.1 ALGO)</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800 gap-2">
            <div>
              <span>Transaction ID: </span>
              <span className="font-mono font-bold text-white">{txData.txId}</span>
            </div>

            {txData.explorerUrl && (
              <a
                href={txData.explorerUrl}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline font-bold inline-flex items-center gap-1 shrink-0"
              >
                <span>View on Algorand Explorer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
