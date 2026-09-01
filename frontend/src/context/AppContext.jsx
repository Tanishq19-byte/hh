import React, { createContext, useContext, useState } from 'react';
import { DEMO_PRESET_SCANS } from '../data/presetData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentScan, setCurrentScan] = useState(DEMO_PRESET_SCANS.noodle);
  const [demoMode, setDemoMode] = useState(true);
  const [paymentHistory, setPaymentHistory] = useState([
    {
      txId: "TX-ALGO-TESTNET-88A92F1",
      productName: "Crispy Instant Noodles (Masala Flavour)",
      amount: "0.01",
      network: "Algorand Testnet",
      settledAt: "2026-08-28T10:15:00.000Z",
      explorerUrl: "https://testnet.explorer.perawallet.app/tx/TX-ALGO-TESTNET-88A92F1"
    }
  ]);

  const [reportsList, setReportsList] = useState([
    {
      reportReference: "FV-2026-88102",
      issueType: "Suspected Adulteration",
      productName: "Red Chilli Powder 100g",
      brand: "PureSpices",
      businessName: "PureSpices & Oils Ltd",
      purchaseDate: "2026-08-26",
      location: "Retail Store, Lajpat Nagar, Delhi",
      batchNumber: "BATCH-2026-04A",
      fssaiNumber: "10018043004567",
      description: "Chilli powder leaves bright red residue in water glass test and smells strongly of artificial solvent.",
      checklistStatus: {
        productPhoto: true,
        labelPhoto: true,
        billUploaded: true,
        batchCaptured: true,
        locationRecorded: true
      },
      status: "Escalated to Authority",
      createdAt: "2026-08-27T14:30:00.000Z",
      evidenceCount: 3
    }
  ]);

  const [evidenceVault, setEvidenceVault] = useState([
    {
      id: "EV-001",
      fileName: "chilli_label_front.jpg",
      fileType: "Label Photo",
      relatedReport: "FV-2026-88102",
      uploadDate: "2026-08-27",
      fileSize: "2.4 MB",
      previewUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "EV-002",
      fileName: "store_receipt_aug26.pdf",
      fileType: "Purchase Bill / Invoice",
      relatedReport: "FV-2026-88102",
      uploadDate: "2026-08-27",
      fileSize: "410 KB",
      previewUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80"
    }
  ]);

  const [userProfile, setUserProfile] = useState({
    name: "Radhika Sharma",
    awarenessScore: 88,
    scannedCount: 14,
    savedProducts: 5,
    paidAnalysesCount: 1
  });

  const addPaymentRecord = (record) => {
    setPaymentHistory(prev => [record, ...prev]);
    setUserProfile(prev => ({
      ...prev,
      paidAnalysesCount: prev.paidAnalysesCount + 1,
      awarenessScore: Math.min(100, prev.awarenessScore + 4)
    }));
  };

  const addReport = (newReport, evidenceFiles = []) => {
    setReportsList(prev => [newReport, ...prev]);
    setUserProfile(prev => ({
      ...prev,
      awarenessScore: Math.min(100, prev.awarenessScore + 5)
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentScan,
        setCurrentScan,
        demoMode,
        setDemoMode,
        paymentHistory,
        addPaymentRecord,
        reportsList,
        addReport,
        evidenceVault,
        setEvidenceVault,
        userProfile,
        setUserProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
