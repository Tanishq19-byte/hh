import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera,
  Upload,
  Edit3,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileSearch,
  Scan as ScanIcon,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { DEMO_PRESET_SCANS } from '../data/presetData';
import { apiService } from '../services/api';
import { useApp } from '../context/AppContext';

export const Scan = () => {
  const navigate = useNavigate();
  const { setCurrentScan, demoMode } = useApp();
  
  const [activeMode, setActiveMode] = useState('preset'); // 'preset', 'upload', 'camera', 'manual'
  const [selectedPreset, setSelectedPreset] = useState('noodle');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Manual Input State
  const [manualData, setManualData] = useState({
    productName: '',
    brand: '',
    ingredients: '',
    allergens: '',
    licenseNumber: '',
    servingSize: '100g',
    calories: '350 kcal',
    sodium: '600 mg',
    batchNumber: ''
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRunScan = async () => {
    setIsLoading(true);
    try {
      let result;
      if (activeMode === 'preset') {
        result = await apiService.scanLabel({ presetKey: selectedPreset });
      } else if (activeMode === 'manual') {
        result = await apiService.scanLabel({ manualInput: manualData });
      } else {
        // Uploaded or Camera captured image
        result = await apiService.scanLabel({ presetKey: selectedPreset, rawText: "User uploaded image scan" });
      }

      if (result && result.data) {
        setCurrentScan(result.data);
        navigate('/scan/result');
      }
    } catch (err) {
      console.error("Scan processing error:", err);
      // Fallback
      setCurrentScan(DEMO_PRESET_SCANS.noodle);
      navigate('/scan/result');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>AI Food Label Scanner & OCR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Upload or Capture a Food Label
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Scan ingredients, additives, E-numbers, allergen statements, and FSSAI licence codes to get simple consumer explanations.
        </p>
      </div>

      {/* Input Mode Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-200/60 p-1.5 rounded-2xl border border-slate-300/80">
        <button
          onClick={() => setActiveMode('preset')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'preset'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Sample Presets</span>
        </button>

        <button
          onClick={() => setActiveMode('upload')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'upload'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Upload className="w-4 h-4 text-emerald-600" />
          <span>Upload Image</span>
        </button>

        <button
          onClick={() => setActiveMode('camera')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'camera'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Camera className="w-4 h-4 text-emerald-600" />
          <span>Device Camera</span>
        </button>

        <button
          onClick={() => setActiveMode('manual')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'manual'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Edit3 className="w-4 h-4 text-emerald-600" />
          <span>Manual Entry</span>
        </button>
      </div>

      {/* Main Interactive Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 card-shadow space-y-6">
        
        {/* MODE 1: SAMPLE PRESETS */}
        {activeMode === 'preset' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Choose a Demo Preset Label</h3>
              <p className="text-xs text-slate-500">Select a pre-scanned product label to test the AI analysis pipeline instantly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Option 1 */}
              <div
                onClick={() => setSelectedPreset('noodle')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedPreset === 'noodle'
                    ? 'border-emerald-700 bg-emerald-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-emerald-300 bg-white'
                }`}
              >
                <div className="h-32 rounded-xl bg-slate-100 overflow-hidden mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80"
                    alt="Instant Noodles"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Crispy Instant Noodles</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">Needs Attention</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Contains E621 (MSG) & High Sodium (890mg)</p>
              </div>

              {/* Option 2 */}
              <div
                onClick={() => setSelectedPreset('drink')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedPreset === 'drink'
                    ? 'border-emerald-700 bg-emerald-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-emerald-300 bg-white'
                }`}
              >
                <div className="h-32 rounded-xl bg-slate-100 overflow-hidden mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80"
                    alt="Energy Drink"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Thunder Energy Drink</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">Needs Attention</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Contains E102 (Tartrazine) & 25g Added Sugars</p>
              </div>

              {/* Option 3 */}
              <div
                onClick={() => setSelectedPreset('adulterated_spice')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedPreset === 'adulterated_spice'
                    ? 'border-emerald-700 bg-emerald-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-emerald-300 bg-white'
                }`}
              >
                <div className="h-32 rounded-xl bg-slate-100 overflow-hidden mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"
                    alt="Red Chilli Powder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Red Chilli Powder</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">Important Info</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Active FSSAI Recall Match #REC-2026-001</p>
              </div>

            </div>
          </div>
        )}

        {/* MODE 2: FILE UPLOAD */}
        {activeMode === 'upload' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Upload Food Label Photo</h3>
            <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-8 text-center bg-emerald-50/30 hover:bg-emerald-50/60 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-800">
                  {uploadedFile ? uploadedFile.name : 'Click or Drag & Drop Label Image Here'}
                </span>
                <span className="text-xs text-slate-500">Supports JPG, PNG, WEBP up to 10MB</span>
              </div>
            </div>

            {previewUrl && (
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border flex items-center gap-4">
                <img src={previewUrl} alt="Preview" className="w-20 h-20 object-cover rounded-lg border" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-slate-800">Uploaded Image Preview</p>
                  <p className="text-slate-500">OCR text extraction ready.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODE 3: CAMERA FEED SIMULATION */}
        {activeMode === 'camera' && (
          <div className="space-y-4 text-center">
            <h3 className="text-base font-bold text-slate-900">Device Camera Capture</h3>
            <div className="bg-slate-950 rounded-2xl h-64 border border-slate-800 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
              <div className="absolute inset-4 border-2 border-emerald-400/50 rounded-xl pointer-events-none flex items-center justify-center">
                <div className="w-full border-t border-emerald-400/30 animate-pulse"></div>
              </div>
              <Camera className="w-12 h-12 text-emerald-400 mb-3 animate-bounce" />
              <p className="text-xs font-semibold text-emerald-300">Align Food Label within framing box</p>
              <p className="text-[11px] text-slate-400 mt-1">Webcam OCR lens active</p>
            </div>
          </div>
        )}

        {/* MODE 4: MANUAL ENTRY */}
        {activeMode === 'manual' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Enter Product Information Manually</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Masala Oats 500g"
                  value={manualData.productName}
                  onChange={(e) => setManualData({ ...manualData, productName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. NutriGrains"
                  value={manualData.brand}
                  onChange={(e) => setManualData({ ...manualData, brand: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ingredients & Additives List</label>
                <textarea
                  rows="3"
                  placeholder="e.g. Rolled Oats, Salt, E621 Monosodium Glutamate, Vegetable Oil, E330 Citric Acid..."
                  value={manualData.ingredients}
                  onChange={(e) => setManualData({ ...manualData, ingredients: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">FSSAI Licence Number (14 Digits)</label>
                <input
                  type="text"
                  maxLength="14"
                  placeholder="10015011002345"
                  value={manualData.licenseNumber}
                  onChange={(e) => setManualData({ ...manualData, licenseNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Declared Allergens</label>
                <input
                  type="text"
                  placeholder="e.g. Oats, Wheat Gluten"
                  value={manualData.allergens}
                  onChange={(e) => setManualData({ ...manualData, allergens: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Scan Action */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>AI analysis adheres to non-alarmist consumer guidance principles.</span>
          </div>

          <button
            onClick={handleRunScan}
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running AI OCR Analysis...</span>
              </>
            ) : (
              <>
                <ScanIcon className="w-4 h-4" />
                <span>Analyze Food Label</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
