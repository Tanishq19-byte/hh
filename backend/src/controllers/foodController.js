import {
  mockLicenses,
  mockRecalls,
  mockAlerts,
  mockPresetScans,
  mockReports,
  mockEvidenceVault
} from '../data/mockDatabase.js';

// 1. Scan Food Label Endpoint
export const scanFoodLabel = async (req, res) => {
  try {
    const { presetKey, manualInput, rawText } = req.body || {};

    let scanResult;
    if (presetKey && mockPresetScans[presetKey]) {
      scanResult = mockPresetScans[presetKey];
    } else if (manualInput) {
      // Process manual input entry
      const ingredientsList = manualInput.ingredients
        ? manualInput.ingredients.split(',').map(i => i.trim()).filter(Boolean)
        : ["Ingredients pending verification"];

      const hasE621 = manualInput.ingredients?.toUpperCase().includes('E621') || manualInput.ingredients?.toUpperCase().includes('MSG');
      const hasE102 = manualInput.ingredients?.toUpperCase().includes('E102') || manualInput.ingredients?.toUpperCase().includes('TARTRAZINE');

      scanResult = {
        productName: manualInput.productName || "Custom Consumer Product",
        brand: manualInput.brand || "Specified Brand",
        overallStatus: (hasE621 || hasE102) ? "Needs Attention" : "Good",
        licenseNumber: manualInput.licenseNumber || "10015011002345",
        licenseVerified: true,
        ingredients: ingredientsList.map(name => ({
          name,
          isAdditive: name.includes('E') || name.includes('INS'),
          code: name.match(/E\d+/)?.[0] || null
        })),
        additives: hasE621 ? [
          {
            code: "E621",
            name: "Monosodium Glutamate (MSG)",
            purpose: "Flavour Enhancer",
            safetyCategory: "Attention",
            simpleExplanation: "Used to enhance savoury umami taste.",
            consumerNote: "Approved flavouring ingredient legally declared."
          }
        ] : [],
        allergens: manualInput.allergens ? manualInput.allergens.split(',').map(a => a.trim()) : ["Not specified"],
        nutrition: {
          servingSize: manualInput.servingSize || "100g",
          energy: manualInput.calories || "250 kcal",
          sodium: manualInput.sodium || "Not listed"
        },
        labelCompleteness: {
          score: 85,
          fssaiLogoPresent: true,
          batchNumberPresent: !!manualInput.batchNumber,
          expiryDatePresent: true,
          allergenDeclarationPresent: !!manualInput.allergens
        },
        observations: [
          "Manual product label input processed.",
          "Check allergen listings against personal dietary sensitivities."
        ],
        attentionItems: hasE621 ? [
          { item: "E621 Additive", severity: "Informational", note: "Contains legally declared MSG flavour enhancer." }
        ] : [],
        explanation: `Analysis completed for ${manualInput.productName || 'specified item'}. Key ingredients and additives mapped to official FSSAI safety reference standard.`,
        confidence: 0.90
      };
    } else {
      // Default fallback demo result (Noodle scan)
      scanResult = mockPresetScans.noodle;
    }

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      data: scanResult
    });
  } catch (error) {
    console.error("Error in scanFoodLabel:", error);
    return res.status(500).json({
      success: false,
      error: "AI analysis is temporarily unavailable.",
      message: error.message
    });
  }
};

// 2. Analyze Label Raw Text Endpoint
export const analyzeLabelText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({
        success: false,
        error: "Label text is required for analysis."
      });
    }

    const defaultResult = { ...mockPresetScans.noodle, extractedText: text };
    return res.status(200).json({
      success: true,
      data: defaultResult
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to analyze raw label text."
    });
  }
};

// 3. Get Products Catalog
export const getProducts = async (req, res) => {
  const products = [
    { id: "p1", name: "Crispy Instant Noodles", brand: "QuickChef", category: "Snacks", status: "Needs Attention" },
    { id: "p2", name: "Thunder Energy Drink 250ml", brand: "Pulse", category: "Beverages", status: "Needs Attention" },
    { id: "p3", name: "Red Chilli Powder 100g", brand: "PureSpices", category: "Spices", status: "Important Information" },
    { id: "p4", name: "Whole Wheat Atta 5kg", brand: "Himalaya Grains", category: "Staples", status: "Good" }
  ];
  return res.status(200).json({ success: true, count: products.length, data: products });
};

// 4. Verify FSSAI Business License
export const verifyBusiness = async (req, res) => {
  try {
    const { license, query } = req.query;

    let matched = null;
    if (license) {
      const cleanLic = license.trim();
      matched = mockLicenses.find(l => l.licenseNumber === cleanLic);
    } else if (query) {
      const cleanQ = query.trim().toLowerCase();
      matched = mockLicenses.find(l => 
        l.businessName.toLowerCase().includes(cleanQ) || 
        l.licenseNumber.includes(cleanQ)
      );
    }

    if (matched) {
      return res.status(200).json({
        success: true,
        source: "Demo verification dataset",
        isOfficialApi: false,
        data: matched
      });
    }

    // Default response if license not found
    if (license && license.length === 14 && /^\d+$/.test(license)) {
      return res.status(200).json({
        success: true,
        source: "Demo verification dataset",
        isOfficialApi: false,
        data: {
          licenseNumber: license,
          businessName: "Standard Registered Enterprise",
          category: "Food Retail & Processing",
          status: "Active",
          issuedDate: "2023-04-10",
          expiryDate: "2028-04-09",
          address: "FSSAI Registered Hub, Sector 15, New Delhi",
          state: "Delhi",
          isDemo: true,
          verificationTimestamp: new Date().toISOString()
        }
      });
    }

    return res.status(404).json({
      success: false,
      message: "No FSSAI license record found matching search criteria.",
      demoNote: "Enter 14-digit demo license '10015011002345' or company name 'Himalaya Foods'"
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "License verification system error." });
  }
};

// 5. Get Recalls List
export const getRecalls = async (req, res) => {
  const { severity, category, search } = req.query;
  let results = [...mockRecalls];

  if (severity) {
    results = results.filter(r => r.severity.toLowerCase() === severity.toLowerCase());
  }
  if (category) {
    results = results.filter(r => r.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(r => 
      r.productName.toLowerCase().includes(q) || 
      r.manufacturer.toLowerCase().includes(q) ||
      r.reason.toLowerCase().includes(q)
    );
  }

  return res.status(200).json({ success: true, count: results.length, data: results });
};

// 6. Get Safety Alerts List
export const getAlerts = async (req, res) => {
  return res.status(200).json({ success: true, count: mockAlerts.length, data: mockAlerts });
};

// 7. Submit Consumer Report
export const createReport = async (req, res) => {
  try {
    const reportData = req.body;
    if (!reportData.issueType || !reportData.productName || !reportData.description) {
      return res.status(400).json({
        success: false,
        error: "Missing required report fields (issueType, productName, description)."
      });
    }

    const refNumber = `FV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReport = {
      reportReference: refNumber,
      issueType: reportData.issueType,
      productName: reportData.productName,
      brand: reportData.brand || "Unspecified",
      businessName: reportData.businessName || "Unspecified Vendor",
      purchaseDate: reportData.purchaseDate || new Date().toISOString().split('T')[0],
      location: reportData.location || "Recorded Location",
      batchNumber: reportData.batchNumber || "Not captured",
      fssaiNumber: reportData.fssaiNumber || "Not captured",
      description: reportData.description,
      checklistStatus: reportData.checklistStatus || {
        productPhoto: true,
        labelPhoto: true,
        billUploaded: false,
        batchCaptured: true,
        locationRecorded: true
      },
      status: "Submitted",
      createdAt: new Date().toISOString(),
      evidenceCount: (reportData.evidenceFiles || []).length
    };

    mockReports.unshift(newReport);

    return res.status(201).json({
      success: true,
      message: "Food safety issue report generated successfully.",
      data: newReport
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to submit report." });
  }
};

// 8. Get Submitted Reports List
export const getReports = async (req, res) => {
  return res.status(200).json({ success: true, count: mockReports.length, data: mockReports });
};

// 9. Add Evidence Item
export const createEvidence = async (req, res) => {
  try {
    const { fileName, fileType, relatedReport, fileUrl } = req.body;
    const newEvidence = {
      id: `EV-00${mockEvidenceVault.length + 1}`,
      fileName: fileName || "evidence_photo.jpg",
      fileType: fileType || "Product Photo",
      relatedReport: relatedReport || "FV-2026-88102",
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: "1.8 MB",
      previewUrl: fileUrl || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"
    };

    mockEvidenceVault.unshift(newEvidence);
    return res.status(201).json({ success: true, data: newEvidence });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to upload evidence item." });
  }
};

// 10. Get User Dashboard Metrics & Activity
export const getUserDashboard = async (req, res) => {
  const dashboardData = {
    userProfile: {
      name: "Radhika Sharma",
      awarenessScore: 88,
      memberSince: "July 2026",
      rank: "Safety Watcher"
    },
    activityCounts: {
      scannedProducts: 14,
      reportsSubmitted: mockReports.length,
      savedProducts: 5,
      activeAlertsCount: mockAlerts.length,
      evidenceVaultFiles: mockEvidenceVault.length
    },
    scansHistory: Object.values(mockPresetScans),
    recentReports: mockReports,
    safetyAwarenessProgress: [
      { month: "May", score: 62 },
      { month: "Jun", score: 70 },
      { month: "Jul", score: 79 },
      { month: "Aug", score: 88 }
    ]
  };

  return res.status(200).json({ success: true, data: dashboardData });
};
