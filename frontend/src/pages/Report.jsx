import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  Camera,
  MapPin,
  Calendar,
  Building2,
  Tag,
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';

export const Report = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addReport } = useApp();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Report Form State
  const [formData, setFormData] = useState({
    issueType: searchParams.get('category') ? 'Suspected Adulteration' : 'Suspected Adulteration',
    productName: searchParams.get('product') || '',
    brand: searchParams.get('brand') || '',
    businessName: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    location: '',
    batchNumber: '',
    fssaiNumber: searchParams.get('fssai') || '',
    description: '',
    evidenceFiles: []
  });

  const issueOptions = [
    { id: 'Suspected Adulteration', title: 'Suspected Adulteration', desc: 'Unusual color bleeding, strange odor, chemical taste or foreign particles.' },
    { id: 'Mislabelled Product', title: 'Mislabelled Product', desc: 'Missing allergen notices, inaccurate ingredient statements or fake seal.' },
    { id: 'Expired Product', title: 'Expired Product', desc: 'Product sold past its marked Best-Before or Use-By expiry date.' },
    { id: 'Damaged Packaging', title: 'Damaged Packaging', desc: 'Tampered seal, punctured pouch, or swollen canned container.' },
    { id: 'Suspicious Food Business', title: 'Suspicious Food Business', desc: 'Vendor operating without FSSAI licence display or unhygienic unit.' },
    { id: 'Food Poisoning Concern', title: 'Food Poisoning Concern', desc: 'Acute illness experienced after consuming specific commercial food.' },
    { id: 'Other', title: 'Other Concern', desc: 'Any other food safety or consumer standards non-compliance issue.' }
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      evidenceFiles: [...prev.evidenceFiles, ...files]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await apiService.submitReport(formData);
      if (res && res.data) {
        addReport(res.data, formData.evidenceFiles);
        navigate('/my-reports');
      }
    } catch (err) {
      console.error("Error submitting report:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Checklist Items calculation
  const checklist = {
    productPhoto: formData.evidenceFiles.length > 0,
    labelPhoto: formData.evidenceFiles.length > 1,
    billUploaded: formData.evidenceFiles.length > 2,
    batchCaptured: formData.batchNumber.length > 2,
    locationRecorded: formData.location.length > 3
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
          <FileText className="w-4 h-4 text-blue-700" />
          <span>Consumer Safety Issue Reporter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Report a Food Safety Issue
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Follow our 4-step evidence wizard to generate a structured report summary for your records and regulatory submission.
        </p>
      </div>

      {/* STEP PROGRESS BAR */}
      <div className="flex items-center justify-between max-w-xl mx-auto px-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              step === i
                ? 'bg-emerald-800 text-white shadow-md'
                : step > i
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-slate-200 text-slate-600'
            }`}>
              {step > i ? '✓' : i}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-700">
              {i === 1 && 'Issue Type'}
              {i === 2 && 'Product Details'}
              {i === 3 && 'Evidence Checklist'}
              {i === 4 && 'Review & Submit'}
            </span>
          </div>
        ))}
      </div>

      {/* WIZARD CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow space-y-6">
        
        {/* STEP 1: ISSUE TYPE SELECTION */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">Step 1: Select What Happened</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {issueOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setFormData({ ...formData, issueType: opt.id })}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-1 ${
                    formData.issueType === opt.id
                      ? 'border-emerald-700 bg-emerald-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-emerald-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900">{opt.title}</h3>
                    {formData.issueType === opt.id && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">{opt.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs"
              >
                <span>Continue to Product Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PRODUCT & BUSINESS DETAILS */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">Step 2: Product & Vendor Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Red Chilli Powder 100g"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. PureSpices"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Manufacturer / Store Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. PureSpices & Oils Ltd / Lajpat Nagar Supermarket"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Purchase / Event Date</label>
                <input
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Batch / Lot Number</label>
                <input
                  type="text"
                  placeholder="e.g. BATCH-2026-04A"
                  value={formData.batchNumber}
                  onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">14-Digit FSSAI Licence Number (if printed)</label>
                <input
                  type="text"
                  placeholder="e.g. 10018043004567"
                  value={formData.fssaiNumber}
                  onChange={(e) => setFormData({ ...formData, fssaiNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Purchase Location / Retailer Address</label>
                <input
                  type="text"
                  placeholder="e.g. Store #14, Main Market, Lajpat Nagar, New Delhi"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Description of Issue *</label>
                <textarea
                  rows="3"
                  placeholder="Describe what you observed (e.g., color bleeding in water, strange smell, missing expiry date label...)"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs"
              >
                <span>Continue to Evidence Checklist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: EVIDENCE UPLOAD & CHECKLIST */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-900">Step 3: Upload Evidence & Verify Checklist</h2>

            {/* Upload Dropzone */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 relative cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">Upload Product Photos, Label Wrappers & Store Bills</p>
              <p className="text-[11px] text-slate-500 mt-1">Select one or multiple files (JPG, PNG, PDF)</p>
            </div>

            {/* Uploaded Files Count */}
            {formData.evidenceFiles.length > 0 && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900">
                📎 {formData.evidenceFiles.length} Evidence File(s) Attached
              </div>
            )}

            {/* SPECIFICATION MANDATED EVIDENCE CHECKLIST */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                Evidence Completeness Checklist
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border">
                  <span>☑ Product photo uploaded</span>
                  {checklist.productPhoto ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Attached
                    </span>
                  ) : (
                    <span className="text-slate-400">Pending</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white border">
                  <span>☑ Label & FSSAI seal photo uploaded</span>
                  {checklist.labelPhoto ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Attached
                    </span>
                  ) : (
                    <span className="text-slate-400">Pending</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white border">
                  <span>☑ Purchase bill / invoice uploaded</span>
                  {checklist.billUploaded ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Attached
                    </span>
                  ) : (
                    <span className="text-slate-400">Optional</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white border">
                  <span>☑ Batch number captured</span>
                  {checklist.batchCaptured ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Captured
                    </span>
                  ) : (
                    <span className="text-slate-400">Pending</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white border">
                  <span>☑ Purchase location recorded</span>
                  {checklist.locationRecorded ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Recorded
                    </span>
                  ) : (
                    <span className="text-slate-400">Pending</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs"
              >
                <span>Review Structured Report</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & SUBMIT STRUCTURED SUMMARY */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-slate-900">Step 4: Review Structured Report Summary</h2>

            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-emerald-400 font-mono">Report Summary Preview</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {formData.issueType}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>Product: <strong className="text-white block font-bold">{formData.productName || 'Unspecified Product'}</strong></div>
                <div>Brand: <strong className="text-white block font-bold">{formData.brand || 'N/A'}</strong></div>
                <div>Vendor: <strong className="text-white block">{formData.businessName || 'N/A'}</strong></div>
                <div>Batch #: <strong className="text-white block font-mono">{formData.batchNumber || 'N/A'}</strong></div>
                <div>FSSAI #: <strong className="text-white block font-mono">{formData.fssaiNumber || 'N/A'}</strong></div>
                <div>Location: <strong className="text-white block">{formData.location || 'N/A'}</strong></div>
              </div>

              <div className="border-t border-slate-800 pt-3 text-xs">
                <span className="text-slate-400 block mb-1">Issue Description:</span>
                <p className="text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  "{formData.description || 'No description entered.'}"
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs shadow-lg transition-all"
              >
                {isSubmitting ? 'Generating Report...' : 'Confirm & Submit Report'}
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
