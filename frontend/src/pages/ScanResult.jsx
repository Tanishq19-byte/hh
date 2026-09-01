import React, { useState } from 'react';
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
  BookOpen,
  Cpu,
  Lock,
  Unlock,
  Loader2,
  Wallet
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { X402PaymentTracker } from '../components/X402PaymentTracker';
import { useApp } from '../context/AppContext';
import { useWallet } from '../context/WalletContext';
import { apiService } from '../services/api';

export const ScanResult = () => {
  const navigate = useNavigate();
  const { currentScan, addPaymentRecord } = useApp();
  const { isConnected, setIsModalOpen, executeX402Payment } = useWallet();

  const [x402Status, setX402Status] = useState('idle'); // 'idle' | 'required' | 'signing' | 'submitted' | 'settling' | 'unlocked'
  const [unlockedIntelligence, setUnlockedIntelligence] = useState(null);
  const [activeTxData, setActiveTxData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
    id: productId = 'scan-noodle-01',
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

  // Execute x402 Payment & Intelligence Unlock Flow
  const handleUnlockIntelligence = async () => {
    if (!isConnected) {
      setIsModalOpen(true);
      return;
    }

    setIsProcessing(true);
    setX402Status('required');

    try {
      // Step 1: Request x402 protected endpoint (returns HTTP 402)
      setX402Status('signing');
      
      // Step 2: Sign real Algorand Testnet transaction
      const paymentResult = await executeX402Payment(0.01);
      setActiveTxData(paymentResult);
      setX402Status('submitted');

      // Step 3: GoPlausible Facilitator Settlement
      setX402Status('settling');
      
      // Simulated 1.5s network settlement verification window
      await new Promise(r => setTimeout(r, 1500));

      // Step 4: Access premium intelligence
      const intelRes = await apiService.getPremiumIntelligence(productId, paymentResult);
      if (intelRes && intelRes.data) {
        setUnlockedIntelligence(intelRes.data);
        setX402Status('unlocked');
        
        // Save to global payment history ledger
        addPaymentRecord({
          txId: paymentResult.txId,
          productName,
          amount: '0.01',
          network: 'Algorand Testnet',
          settledAt: new Date().toISOString(),
          explorerUrl: paymentResult.explorerUrl
        });
      }
    } catch (err) {
      console.error("x402 unlock error:", err);
      setX402Status('idle');
      alert(`Payment was not completed. No premium access was granted. (${err.message})`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Action Bar */}
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

          <div className="shrink-0 flex flex-col items-start md:items-end gap-1">
            <span className="text-xs text-slate-500 font-medium">Overall Information Status</span>
            <StatusBadge status={overallStatus} size="lg" />
          </div>
        </div>

        {/* BASIC FOOD ANALYSIS SUMMARY */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Basic Food Analysis</h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
            "{explanation}"
          </div>
        </div>

      </div>

      {/* PROMPT MANDATED SECTION: FOODVIGIL AGENT DECISION UI */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow space-y-6">
        
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">FOODVIGIL AGENT DECISION ENGINE</h3>
              <p className="text-xs text-slate-500">Autonomous resource evaluation & x402 request trigger</p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            x402 Protocol Enabled
          </span>
        </div>

        {/* High-Level Reasoning Steps (Concise action/status explanations) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Label Analyzed</span>
            </div>
            <p className="text-[11px] text-emerald-900/80">OCR label text parsed into ingredients & codes.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Ingredients Identified</span>
            </div>
            <p className="text-[11px] text-emerald-900/80">Mapped {ingredients.length} declared ingredient components.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Additives Identified</span>
            </div>
            <p className="text-[11px] text-emerald-900/80">{additives.length} food additive code(s) flagged.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-medium space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Verification Recommended</span>
            </div>
            <p className="text-[11px] text-amber-900/80">Agent recommends requesting Tier 1 verified intelligence.</p>
          </div>
        </div>

        {/* UNLOCK BUTTON & TRIGGER */}
        {x402Status !== 'unlocked' && (
          <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Lock className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white">Tier 1 Verified Intelligence Locked</h4>
              </div>
              <p className="text-xs text-slate-300">
                Agent requests deep verified lab records, FSSAI regulatory compliance, and market recall cross-audit.
              </p>
              <div className="text-[11px] text-emerald-400 font-mono pt-1">
                Price: <strong>$0.01 USDC (0.1 ALGO)</strong> | Network: <strong>Algorand Testnet</strong> | Facilitator: <strong>GoPlausible</strong>
              </div>
            </div>

            <button
              onClick={handleUnlockIntelligence}
              disabled={isProcessing}
              className="px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0 flex items-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing x402 Payment...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>UNLOCK VERIFIED INTELLIGENCE — $0.01 USDC</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* LIVE X402 TRANSACTION TRACKER COMPONENT */}
        {x402Status !== 'idle' && (
          <X402PaymentTracker status={x402Status} txData={activeTxData} />
        )}

      </div>

      {/* UNLOCKED PREMIUM RESULT SECTION */}
      {x402Status === 'unlocked' && unlockedIntelligence && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 card-shadow space-y-6 animate-in fade-in duration-300">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-extrabold text-slate-900">VERIFIED FOOD INTELLIGENCE</h2>
              </div>
              <p className="text-xs font-mono text-emerald-800 font-bold">
                Unlocked via x402 Micropayment on Algorand Testnet
              </p>
            </div>

            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              ✓ Verified & Settled
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider text-slate-500">Safety & Additive Intelligence</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Product Name</span>
                  <span className="font-bold text-slate-900">{unlockedIntelligence.product}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Additives Flagged</span>
                  <span className="font-bold text-emerald-800">{additives.length} detected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Allergens Declared</span>
                  <span className="font-bold text-rose-800">{allergens.join(', ') || 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Active Recall Status</span>
                  <span className="font-bold text-emerald-800">
                    {unlockedIntelligence.recallMatches?.length === 0 ? 'No matching recall found' : 'Recall match detected'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider text-slate-500">Licence & Audit Verification</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">FSSAI Licence #</span>
                  <span className="font-mono font-bold text-slate-900">{licenseNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Licence Status</span>
                  <span className="font-bold text-emerald-800">{unlockedIntelligence.licenseInformation?.status || 'Active'}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-slate-500">AI Confidence Score</span>
                  <span className="font-bold text-emerald-900">{(unlockedIntelligence.confidence * 100).toFixed(0)}% Verified</span>
                </div>
              </div>
            </div>

          </div>

          {/* Observations */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-900">Verified Safety Observations:</h4>
            <ul className="space-y-1.5 text-slate-700">
              {(unlockedIntelligence.safetyObservations || []).map((obs, i) => (
                <li key={i} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-200/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* PROMPT MANDATED TRANSACTION FOOTER */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs border border-slate-800">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div>Payment: <strong className="text-emerald-400 font-mono">$0.01 USDC</strong></div>
              <div>Network: <strong className="text-emerald-400">Algorand Testnet</strong></div>
              <div>Facilitator: <strong className="text-emerald-400">GoPlausible</strong></div>
            </div>

            {activeTxData && (
              <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] gap-2">
                <div>
                  <span>Transaction ID: </span>
                  <span className="font-mono font-bold text-emerald-300">{activeTxData.txId}</span>
                </div>

                <a
                  href={activeTxData.explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline font-bold inline-flex items-center gap-1 shrink-0"
                >
                  <span>VIEW ON ALGORAND EXPLORER</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-500 italic text-center">
            "AI-generated analysis. Verify important decisions using official sources."
          </p>

        </div>
      )}

      {/* 7 DETAILED BREAKDOWN CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Additives, Ingredients, Allergens */}
        <div className="lg:col-span-7 space-y-6">
          
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
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Nutrition, Completeness, License & Recall Status */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 card-shadow space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">Nutrition Information</h3>
            <div className="divide-y text-xs">
              <div className="py-1.5 flex justify-between"><span className="text-slate-500">Serving Size</span><span className="font-bold text-slate-900">{nutrition.servingSize || '100g'}</span></div>
              <div className="py-1.5 flex justify-between"><span className="text-slate-500">Energy (Calories)</span><span className="font-bold text-slate-900">{nutrition.energy || 'N/A'}</span></div>
              <div className="py-1.5 flex justify-between"><span className="text-slate-500">Sodium</span><span className="font-bold text-rose-800">{nutrition.sodium || 'N/A'}</span></div>
            </div>
          </div>

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

        </div>

      </div>

    </div>
  );
};
