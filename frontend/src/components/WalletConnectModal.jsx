import React from 'react';
import { X, Wallet, ExternalLink, ShieldCheck, CheckCircle2, RefreshCw, Copy } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

export const WalletConnectModal = () => {
  const { isModalOpen, setIsModalOpen, address, balance, isConnected, network, connectWallet, disconnectWallet } = useWallet();

  if (!isModalOpen) return null;

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    alert("Algorand Testnet address copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200">
        
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Algorand Wallet</h3>
              <p className="text-[11px] text-slate-500 font-medium">Network: <strong>{network}</strong></p>
            </div>
          </div>
          
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isConnected ? (
          <div className="space-y-4">
            
            {/* Account Details */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Testnet Address</span>
                <button onClick={copyAddress} className="text-emerald-800 font-bold hover:underline flex items-center gap-1">
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>
              <p className="font-mono text-slate-900 font-bold break-all bg-white p-2.5 rounded-xl border">
                {address}
              </p>
            </div>

            {/* Balances */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">ALGO Balance</span>
                <span className="text-lg font-extrabold text-emerald-950 font-mono">{balance.algo} ALGO</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-center">
                <span className="text-[10px] font-bold text-teal-800 uppercase block">USDC Testnet</span>
                <span className="text-lg font-extrabold text-teal-950 font-mono">${balance.usdc} USDC</span>
              </div>
            </div>

            {/* Testnet Faucet Link */}
            <div className="pt-2">
              <a
                href="https://bank.testnet.algorand.network/"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border"
              >
                <span>Get Algorand Testnet Faucet Funds</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Disconnect */}
            <button
              onClick={() => { disconnectWallet(); setIsModalOpen(false); }}
              className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs border border-rose-200"
            >
              Disconnect Wallet
            </button>

          </div>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-xs text-slate-600">
              Connect an Algorand Testnet wallet to approve x402 micro-payments ($0.01 USDC).
            </p>
            
            <button
              onClick={connectWallet}
              className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md"
            >
              Connect Algorand Testnet Wallet
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
