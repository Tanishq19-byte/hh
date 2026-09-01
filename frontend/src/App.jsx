import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Scan } from './pages/Scan';
import { ScanResult } from './pages/ScanResult';
import { Verify } from './pages/Verify';
import { Alerts } from './pages/Alerts';
import { SpotTheRisk } from './pages/SpotTheRisk';
import { Report } from './pages/Report';
import { MyReports } from './pages/MyReports';
import { EvidenceVault } from './pages/EvidenceVault';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { AppProvider } from './context/AppContext';

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/scan/result" element={<ScanResult />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/spot-the-risk" element={<SpotTheRisk />} />
            <Route path="/report" element={<Report />} />
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/evidence" element={<EvidenceVault />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
