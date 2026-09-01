import React from 'react';
import { ShieldCheck, ExternalLink, Cpu, CheckCircle2, Clock, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PaymentHistory = () => {
  const { paymentHistory } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-emerald-400 text-xs font-bold border border-slate-800">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span>Agentic x402 Micropayment Ledger</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Payment History & Settlement Audit
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Verified log of x402 agentic micropayments settled on the Algorand Testnet via GoPlausible Facilitator.
        </p>
      </div>

      {/* PAYMENTS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 card-shadow overflow-hidden">
        
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-base font-bold text-slate-900">Algorand Testnet Transactions</h2>
            <p className="text-xs text-slate-500">Real HTTP 402 settled payment records</p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            Network: Algorand Testnet
          </span>
        </div>

        {paymentHistory.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 space-y-3">
            <Clock className="w-8 h-8 text-slate-300 mx-auto" />
            <p>No x402 micropayments recorded yet.</p>
            <p>Scan a product label and unlock Tier 1 verified intelligence to trigger a real x402 transaction!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b">
                <tr>
                  <th className="px-6 py-3">Resource / Product</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Network</th>
                  <th className="px-6 py-3">Transaction ID</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Explorer Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {paymentHistory.map((tx) => (
                  <tr key={tx.txId} className="hover:bg-slate-50/80 transition-colors">
                    
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{tx.productName || 'Premium Food Intelligence'}</div>
                      <span className="text-[10px] text-slate-500 font-mono">Date: {new Date(tx.settledAt).toLocaleDateString()}</span>
                    </td>

                    <td className="px-6 py-4 font-mono font-bold text-emerald-800">
                      ${tx.amount} USDC
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border">
                        {tx.network || 'Algorand Testnet'}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-mono text-slate-800 text-[11px]">
                      {tx.txId}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Confirmed & Settled</span>
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <a
                        href={tx.explorerUrl || `https://testnet.explorer.perawallet.app/tx/${tx.txId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-800 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <span>View on Explorer</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};
