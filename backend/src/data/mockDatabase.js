// FoodVigil Backend In-Memory Database & Seed Dataset

export const mockLicenses = [
  {
    licenseNumber: "10015011002345",
    businessName: "Himalaya Foods Pvt Ltd",
    category: "Food Manufacturer & Processing",
    status: "Active",
    issuedDate: "2022-01-15",
    expiryDate: "2027-01-14",
    address: "Plot 42, Okhla Industrial Area Phase III, New Delhi 110020",
    state: "Delhi",
    isDemo: true,
    verificationTimestamp: new Date().toISOString()
  },
  {
    licenseNumber: "10021022008912",
    businessName: "NutriBite Consumer Products",
    category: "Packaged Snack Processing",
    status: "Active",
    issuedDate: "2021-06-10",
    expiryDate: "2026-06-09",
    address: "Sector 62, Knowledge Park, Noida, Uttar Pradesh 201309",
    state: "Uttar Pradesh",
    isDemo: true,
    verificationTimestamp: new Date().toISOString()
  },
  {
    licenseNumber: "10018043004567",
    businessName: "PureSpices & Oils Ltd",
    category: "Spice Processing & Packaging",
    status: "Under Review",
    issuedDate: "2020-03-01",
    expiryDate: "2025-02-28",
    address: "GIDC Estate, Unjha, Gujarat 384170",
    state: "Gujarat",
    isDemo: true,
    verificationTimestamp: new Date().toISOString()
  },
  {
    licenseNumber: "10019011009999",
    businessName: "FakeCorp Food Products",
    category: "Unlicensed Repackaging Unit",
    status: "Suspended",
    issuedDate: "2019-11-12",
    expiryDate: "2024-11-11",
    address: "Unregistered Industrial Shed, Bawana, Delhi 110039",
    state: "Delhi",
    isDemo: true,
    verificationTimestamp: new Date().toISOString()
  }
];

export const mockRecalls = [
  {
    id: "REC-2026-001",
    productName: "Spiced Chilli Flakes 100g",
    manufacturer: "PureSpices & Oils Ltd",
    batchNumber: "BATCH-2026-04A",
    reason: "Detection of unauthorized synthetic dye (Sudan Red I) during routine market sampling tests.",
    severity: "Urgent",
    region: "North India (Delhi NCR, Punjab, Haryana)",
    source: "FSSAI Food Safety Advisory #04/2026",
    sourceUrl: "https://fssai.gov.in/recalls/2026-04a",
    recalledDate: "2026-08-20",
    category: "Spices"
  },
  {
    id: "REC-2026-002",
    productName: "Almond Milk Crunch Drink 250ml",
    manufacturer: "NutriBite Consumer Products",
    batchNumber: "L-8842",
    reason: "Undeclared Soy Protein allergen on packaging label due to cross-contamination on shared production line.",
    severity: "Warning",
    region: "Pan-India",
    source: "Consumer Safety Alert Notice",
    sourceUrl: "https://fssai.gov.in/alerts/allergen-8842",
    recalledDate: "2026-08-12",
    category: "Beverages"
  },
  {
    id: "REC-2026-003",
    productName: "Gold Butter Biscuits 200g",
    manufacturer: "TastyTreat Bakes Ltd",
    batchNumber: "B-1092",
    reason: "Elevated moisture content during packaging leading to potential premature microbial growth.",
    severity: "Info",
    region: "Western Region (Maharashtra, Goa)",
    source: "Manufacturer Voluntary Recall",
    sourceUrl: "https://tastytreat.com/recalls/b1092",
    recalledDate: "2026-07-28",
    category: "Packaged Snacks"
  }
];

export const mockAlerts = [
  {
    id: "ALT-2026-101",
    title: "Festive Season Advisory: Adulteration Checks on Mawa (Khoya) & Silver Leaf (Vark)",
    category: "Dairy & Confectionery",
    summary: "FSSAI releases public guideline urging consumers to verify starch adulteration in खोया (Mawa) using iodine solution and silver leaf purity testing.",
    severity: "High",
    affectedRegions: "All India",
    advisorySource: "FSSAI Central Executive Directorate",
    publishedDate: "2026-08-25"
  },
  {
    id: "ALT-2026-102",
    title: "Mandatory FSSAI License & Expiry Marking on Open Bulk Spices",
    category: "Spices & Oils",
    summary: "All retail vendors must clearly display 14-digit FSSAI license numbers and batch dates on loose spice sacks.",
    severity: "Medium",
    affectedRegions: "State Food Safety Directorates",
    advisorySource: "Department of Consumer Affairs",
    publishedDate: "2026-08-18"
  }
];

export const mockPresetScans = {
  noodle: {
    productName: "Crispy Instant Noodles (Masala Flavour)",
    brand: "QuickChef",
    overallStatus: "Needs Attention",
    licenseNumber: "10015011002345",
    licenseVerified: true,
    ingredients: [
      { name: "Refined Wheat Flour (Maida)", isAdditive: false },
      { name: "Palm Oil", isAdditive: false },
      { name: "Iodised Salt", isAdditive: false },
      { name: "Wheat Gluten", isAdditive: false, allergen: "Gluten" },
      { name: "Monosodium Glutamate (E621)", isAdditive: true, code: "E621" },
      { name: "Acidity Regulator (E500ii)", isAdditive: true, code: "E500ii" },
      { name: "Guar Gum (E412)", isAdditive: true, code: "E412" }
    ],
    additives: [
      {
        code: "E621",
        name: "Monosodium Glutamate (MSG)",
        purpose: "Flavour Enhancer",
        safetyCategory: "Attention",
        simpleExplanation: "Enhances savoury umami taste.",
        consumerNote: "Approved flavouring ingredient. Sodium-sensitive consumers or individuals with MSG sensitivity should note presence."
      },
      {
        code: "E412",
        name: "Guar Gum",
        purpose: "Thickener & Stabilizer",
        safetyCategory: "Informational",
        simpleExplanation: "Plant-based fiber extract used to improve noodle texture.",
        consumerNote: "Widely recognized safe food additive derived from guar beans."
      }
    ],
    allergens: ["Gluten", "May contain traces of Soy"],
    nutrition: {
      servingSize: "70g",
      energy: "340 kcal",
      protein: "7.2g",
      carbohydrates: "46g",
      totalSugars: "1.5g",
      addedSugars: "0g",
      totalFat: "14.2g",
      saturatedFat: "6.8g",
      transFat: "0.05g",
      sodium: "890mg (44% Daily Value)"
    },
    labelCompleteness: {
      score: 95,
      fssaiLogoPresent: true,
      batchNumberPresent: true,
      expiryDatePresent: true,
      allergenDeclarationPresent: true
    },
    observations: [
      "High sodium content per serving (890mg).",
      "Contains refined flour (Maida) and palm oil.",
      "Flavour enhancer E621 (MSG) declared on label."
    ],
    attentionItems: [
      { item: "Sodium Content", severity: "Attention", note: "Contains 890mg sodium per 70g serving. High intake should be monitored." },
      { item: "E621 (MSG)", severity: "Informational", note: "Common flavour enhancer legally declared." }
    ],
    explanation: "This product is a standard processed instant noodle. It contains legally declared additives including E621 (MSG) and E412 (Guar Gum). The primary nutritional observation is elevated sodium (890mg per serving). FSSAI license #10015011002345 is verified and active.",
    confidence: 0.96
  },
  drink: {
    productName: "Thunder Energy Drink 250ml",
    brand: "Pulse Nutrition",
    overallStatus: "Needs Attention",
    licenseNumber: "10021022008912",
    licenseVerified: true,
    ingredients: [
      { name: "Carbonated Water", isAdditive: false },
      { name: "Sugar", isAdditive: false },
      { name: "Caffeine (30mg/100ml)", isAdditive: false },
      { name: "Taurine", isAdditive: false },
      { name: "Citric Acid (E330)", isAdditive: true, code: "E330" },
      { name: "Tartrazine (E102)", isAdditive: true, code: "E102" },
      { name: "Sodium Benzoate (E211)", isAdditive: true, code: "E211" }
    ],
    additives: [
      {
        code: "E102",
        name: "Tartrazine",
        purpose: "Synthetic Food Colour",
        safetyCategory: "Attention",
        simpleExplanation: "Adds bright yellow-orange colour.",
        consumerNote: "Permitted synthetic colorant. May trigger hypersensitivity in susceptible individuals."
      },
      {
        code: "E211",
        name: "Sodium Benzoate",
        purpose: "Preservative",
        safetyCategory: "Informational",
        simpleExplanation: "Prevents microbial spoilage in acidic beverages.",
        consumerNote: "Standard beverage preservative within FSSAI permissible limits."
      }
    ],
    allergens: ["None declared"],
    nutrition: {
      servingSize: "250ml",
      energy: "110 kcal",
      protein: "0g",
      carbohydrates: "27g",
      totalSugars: "27g",
      addedSugars: "25g (50% Daily Value)",
      totalFat: "0g",
      sodium: "65mg"
    },
    labelCompleteness: {
      score: 90,
      fssaiLogoPresent: true,
      batchNumberPresent: true,
      expiryDatePresent: true,
      allergenDeclarationPresent: true
    },
    observations: [
      "High added sugar content (25g per 250ml can).",
      "Contains high caffeine (75mg per can) - Not recommended for children or pregnant women.",
      "Contains synthetic food colour Tartrazine (E102)."
    ],
    attentionItems: [
      { item: "Caffeine Warning", severity: "Attention", note: "Contains 30mg caffeine per 100ml. Check mandatory warning statement on can." },
      { item: "High Sugar", severity: "Attention", note: "25g added sugar represents half of recommended daily sugar allowance." }
    ],
    explanation: "This beverage contains high levels of added sugars and caffeine, along with permitted colorant Tartrazine (E102) and preservative Sodium Benzoate (E211). FSSAI license is active.",
    confidence: 0.94
  },
  adulterated_spice: {
    productName: "Red Chilli Powder 100g",
    brand: "PureSpices & Oils Ltd",
    overallStatus: "Important Information",
    licenseNumber: "10018043004567",
    licenseVerified: true,
    ingredients: [
      { name: "Ground Red Chilli", isAdditive: false }
    ],
    additives: [],
    allergens: ["None"],
    nutrition: {
      servingSize: "10g",
      energy: "28 kcal",
      protein: "1.2g",
      carbohydrates: "5g",
      totalFat: "1.1g"
    },
    labelCompleteness: {
      score: 60,
      fssaiLogoPresent: true,
      batchNumberPresent: false,
      expiryDatePresent: true,
      allergenDeclarationPresent: false
    },
    observations: [
      "MATCHED ACTIVE SAFETY RECALL: Batch associated with manufacturer PureSpices is under FSSAI alert #REC-2026-001 for potential synthetic dye (Sudan Red I).",
      "Missing mandatory batch code stamp on physical label.",
      "FSSAI license #10018043004567 is currently UNDER REVIEW by food safety authorities."
    ],
    attentionItems: [
      { item: "Active Recall Match", severity: "High attention", note: "Manufacturer has active recall notice REC-2026-001 for unauthorized colorants." },
      { item: "License Under Review", severity: "Attention", note: "FSSAI license status is Under Review." }
    ],
    explanation: "IMPORTANT: This product manufacturer is subject to an active FSSAI recall notice regarding potential dye adulteration in spice batches. Exercise caution and verify batch numbers before consumption.",
    confidence: 0.98
  }
};

export const mockReports = [
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
    description: "Chilli powder leaves bright red residue in water glass test and smells strongly of artificial chemical solvent.",
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
  },
  {
    reportReference: "FV-2026-44109",
    issueType: "Mislabelled Product",
    productName: "Almond Crunch Bar",
    brand: "NutriBite",
    businessName: "NutriBite Consumer Products",
    purchaseDate: "2026-08-15",
    location: "Supermarket, Noida Sector 18",
    batchNumber: "L-8842",
    fssaiNumber: "10021022008912",
    description: "Contains soy protein extract which was omitted from the bold allergen text box.",
    checklistStatus: {
      productPhoto: true,
      labelPhoto: true,
      billUploaded: true,
      batchCaptured: true,
      locationRecorded: true
    },
    status: "Under Review",
    createdAt: "2026-08-16T10:15:00.000Z",
    evidenceCount: 2
  }
];

export const mockEvidenceVault = [
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
  },
  {
    id: "EV-003",
    fileName: "water_test_residue.jpg",
    fileType: "Product Photo",
    relatedReport: "FV-2026-88102",
    uploadDate: "2026-08-27",
    fileSize: "3.1 MB",
    previewUrl: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=80"
  }
];
