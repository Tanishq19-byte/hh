export const DEMO_PRESET_SCANS = {
  noodle: {
    id: "scan-noodle-01",
    productName: "Crispy Instant Noodles (Masala Flavour)",
    brand: "QuickChef",
    manufacturer: "Himalaya Foods Pvt Ltd",
    overallStatus: "Needs Attention",
    licenseNumber: "10015011002345",
    licenseVerified: true,
    scanTimestamp: new Date().toISOString(),
    imageThumbnail: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
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
        simpleExplanation: "Used to enhance savoury umami taste in seasonings.",
        consumerNote: "Regulatory bodies recognize MSG as safe within prescribed limits. Sensitive individuals may experience transient warmth or tightness if consumed in high doses."
      },
      {
        code: "E412",
        name: "Guar Gum",
        purpose: "Thickener & Stabilizer",
        safetyCategory: "Informational",
        simpleExplanation: "Plant-derived natural soluble fiber extracted from guar beans to improve dough elasticity.",
        consumerNote: "Standard thickener widely used across bakery and sauce formulations."
      }
    ],
    allergens: ["Wheat / Gluten", "May contain traces of Soy & Mustard"],
    nutrition: {
      servingSize: "70g (1 pack)",
      energy: "340 kcal",
      protein: "7.2g",
      carbohydrates: "46.0g",
      totalSugars: "1.5g",
      addedSugars: "0.0g",
      totalFat: "14.2g",
      saturatedFat: "6.8g",
      transFat: "0.05g",
      sodium: "890 mg (44.5% RDA)"
    },
    labelCompleteness: {
      score: 94,
      fssaiLogoPresent: true,
      batchNumberPresent: true,
      expiryDatePresent: true,
      allergenDeclarationPresent: true,
      manufacturerInfoPresent: true
    },
    observations: [
      "High sodium content per single serving (890mg represents nearly 45% of daily recommended limit).",
      "Contains refined flour (Maida) and palm oil as primary ingredients.",
      "Flavour enhancer E621 (MSG) clearly declared in ingredient list."
    ],
    attentionItems: [
      { item: "Sodium Intake", severity: "Attention", note: "Contains 890mg sodium per 70g serving. High intake should be monitored." },
      { item: "E621 Additive", severity: "Informational", note: "Common flavour enhancer legally declared without medical non-compliance." }
    ],
    explanation: "This product is a standard processed instant noodle. It contains legally declared additives including E621 (MSG) and E412 (Guar Gum). The primary nutritional observation is elevated sodium (890mg per serving). FSSAI license #10015011002345 is verified and active.",
    confidence: 0.96
  },
  drink: {
    id: "scan-drink-02",
    productName: "Thunder Energy Drink 250ml",
    brand: "Pulse Nutrition",
    manufacturer: "NutriBite Consumer Products",
    overallStatus: "Needs Attention",
    licenseNumber: "10021022008912",
    licenseVerified: true,
    scanTimestamp: new Date().toISOString(),
    imageThumbnail: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80",
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
        simpleExplanation: "Synthetic dye used to impart vibrant yellow-orange color.",
        consumerNote: "Permitted colorant. May trigger hypersensitivity or mild hives in susceptible individuals."
      },
      {
        code: "E211",
        name: "Sodium Benzoate",
        purpose: "Preservative",
        safetyCategory: "Informational",
        simpleExplanation: "Antimicrobial salt used to prevent spoilage in high-acidity carbonated drinks.",
        consumerNote: "Safe within statutory food safety limits."
      }
    ],
    allergens: ["None declared"],
    nutrition: {
      servingSize: "250ml (1 can)",
      energy: "110 kcal",
      protein: "0g",
      carbohydrates: "27.0g",
      totalSugars: "27.0g",
      addedSugars: "25.0g (50% RDA)",
      totalFat: "0g",
      sodium: "65 mg"
    },
    labelCompleteness: {
      score: 90,
      fssaiLogoPresent: true,
      batchNumberPresent: true,
      expiryDatePresent: true,
      allergenDeclarationPresent: true,
      manufacturerInfoPresent: true
    },
    observations: [
      "Contains 25g added sugars (equivalent to 6 teaspoons of sugar per 250ml can).",
      "Contains high caffeine (75mg per can) — statutory caution advised for children & pregnant women.",
      "Contains synthetic food colour Tartrazine (E102)."
    ],
    attentionItems: [
      { item: "High Added Sugar", severity: "Attention", note: "25g added sugar accounts for half of maximum daily recommended intake." },
      { item: "Caffeine Warning", severity: "Attention", note: "Contains 30mg caffeine per 100ml. Mandatory statutory warning statement required." }
    ],
    explanation: "This carbonated energy beverage contains significant added sugars and caffeine, along with permitted colorant Tartrazine (E102). FSSAI license #10021022008912 is verified and active.",
    confidence: 0.94
  },
  adulterated_spice: {
    id: "scan-spice-03",
    productName: "Red Chilli Powder 100g",
    brand: "PureSpices",
    manufacturer: "PureSpices & Oils Ltd",
    overallStatus: "Important Information",
    licenseNumber: "10018043004567",
    licenseVerified: true,
    scanTimestamp: new Date().toISOString(),
    imageThumbnail: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      { name: "Ground Red Chilli", isAdditive: false }
    ],
    additives: [],
    allergens: ["None declared"],
    nutrition: {
      servingSize: "10g",
      energy: "28 kcal",
      protein: "1.2g",
      carbohydrates: "5.0g",
      totalFat: "1.1g",
      sodium: "5 mg"
    },
    labelCompleteness: {
      score: 62,
      fssaiLogoPresent: true,
      batchNumberPresent: false,
      expiryDatePresent: true,
      allergenDeclarationPresent: false,
      manufacturerInfoPresent: true
    },
    observations: [
      "RECALL ALERT MATCH: Product brand PureSpices matches active FSSAI recall advisory #REC-2026-001 regarding suspected synthetic dye (Sudan Red I).",
      "Missing mandatory batch/lot number stamp on physical label wrapper.",
      "FSSAI license status is currently UNDER REVIEW by food safety regulatory board."
    ],
    attentionItems: [
      { item: "Active Recall Match", severity: "High attention", note: "PureSpices red chilli batches subject to market recall advisory #REC-2026-001." },
      { item: "FSSAI License Under Review", severity: "Attention", note: "License status is Under Review by regulatory authority." }
    ],
    explanation: "IMPORTANT SAFETY ADVISORY: This spice product is associated with a registered FSSAI recall notice for potential industrial dye adulteration in specific production lots. Verify batch details or report suspicious quality.",
    confidence: 0.98
  }
};

export const ADULTERATION_GUIDES = [
  {
    id: "milk",
    title: "Milk & Dairy Purity",
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    commonAdulterants: ["Water", "Starch", "Detergent / Urea", "Synthetic Milk"],
    whatToLookFor: "Natural milk has a smooth, creamy texture without oily residue or chemical foam.",
    warningSigns: [
      "Soapy feeling when rubbed between palms (indicates detergent additive).",
      "Turns blue when mixed with a drop of Iodine solution (indicates starch/flour adulteration).",
      "Yellowish tint when boiled or bitter chemical aftertaste."
    ],
    safePractices: [
      "Purchase milk from FSSAI licensed vendors with clear date stamps.",
      "Boil fresh milk thoroughly before consumption.",
      "Perform periodic home starch spot testing during festive seasons."
    ],
    laboratoryTestingNote: "Home tests (like iodine drop checks) are preliminary consumer awareness indicators only. Formal legal evidence requires certified NABL/FSSAI accredited laboratory testing."
  },
  {
    id: "spices",
    title: "Spices & Condiments (Turmeric / Chilli)",
    category: "Spices",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    commonAdulterants: ["Lead Chromate (Turmeric)", "Sudan Red / Brick Dust (Chilli)", "Sawdust / Starch"],
    whatToLookFor: "Pure ground spices have natural earthy aromas and don't leave heavy colored residues in water.",
    warningSigns: [
      "Chilli powder leaves a bright red streak settling at the bottom of a water glass (brick dust/dye).",
      "Turmeric powder leaves intense yellow stain that turns deep magenta upon adding concentrated acid/lime.",
      "Excessive grit or unpleasant burnt smell."
    ],
    safePractices: [
      "Buy whole spices and grind them at home whenever possible.",
      "Choose sealed spice pouches bearing mandatory 14-digit FSSAI license markings."
    ],
    laboratoryTestingNote: "Water dissolution checks are preliminary awareness steps only. Quantitative chemical dye screening requires accredited laboratory spectral analysis."
  },
  {
    id: "oils",
    title: "Cooking Oils & Ghee",
    category: "Oils & Fats",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    commonAdulterants: ["Argemone Oil", "Mineral Oil", "Unrefined Palm Stearin"],
    whatToLookFor: "Clear consistency, characteristic natural seed aroma without pungent petroleum odor.",
    warningSigns: [
      "Cloudiness or separation at room temperature.",
      "Burning sensation in throat or unusual frothing when heated.",
      "Ghee that does not melt quickly on warm palm."
    ],
    safePractices: [
      "Prefer AGMARK certified or FSSAI licensed packaged oil brands.",
      "Avoid purchasing unlabelled loose cooking oil from unverified street drums."
    ],
    laboratoryTestingNote: "Freezing checks and heating behavior serve as preliminary checks; official adulteration proof demands gas chromatography lab testing."
  },
  {
    id: "sweets",
    title: "Festive Sweets, Khoya & Mawa",
    category: "Confectionery",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    commonAdulterants: ["Starch in Mawa", "Aluminium foil instead of Silver Leaf (Vark)", "Non-permitted Dyes"],
    whatToLookFor: "Mawa should feel soft and rich without sticky rubbery residue.",
    warningSigns: [
      "Silver leaf (Vark) crumbles into grey powder when rubbed on fingers (indicates aluminium foil contamination).",
      "Sweet turns bluish-black when tested with iodine.",
      "Excessively bright fluorescent colors."
    ],
    safePractices: [
      "Buy sweets from registered confectioners displaying FSSAI license boards.",
      "Check packaging date and consume fresh dairy sweets within recommended timeframes."
    ],
    laboratoryTestingNote: "Silver leaf touch tests assist in basic consumer vigilance; confirmation requires ICP-MS metal testing."
  },
  {
    id: "grains",
    title: "Food Grains & Pulses (Dals)",
    category: "Staples",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    commonAdulterants: ["Metanil Yellow Dye (Arhar Dal)", "Sand / Stones", "Chalk Powder"],
    whatToLookFor: "Uniform natural grain color, clean texture, free from powdery residue.",
    warningSigns: [
      "Dal loses color rapidly in warm water leaving bright yellow water.",
      "Powdered chalk or heavy sediment settling at bottom of washing bowl."
    ],
    safePractices: [
      "Wash grains and pulses thoroughly 2-3 times before cooking.",
      "Report batches with heavy artificial dye bleeding."
    ],
    laboratoryTestingNote: "Color bleeding in water indicates dye presence; exact dye identification requires lab analysis."
  },
  {
    id: "fruits",
    title: "Fruits & Vegetables",
    category: "Fresh Produce",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80",
    commonAdulterants: ["Calcium Carbide (Artificial Ripening)", "Copper Sulphate (Green Dye on Veggies)", "Wax Coating"],
    whatToLookFor: "Natural aroma, characteristic subtle skin color variations.",
    warningSigns: [
      "Mangoes or bananas with bright yellow skin but green hard pulp inside (Carbide ripening sign).",
      "Cotton swab soaked in mineral oil/vinegar turns green when rubbed on okra/peas (Copper dye).",
      "Unnaturally glossy fruit skin that scrapes off as white powder."
    ],
    safePractices: [
      "Wash produce under running water for at least 60 seconds; peel skin when appropriate.",
      "Buy seasonal produce from trusted local markets."
    ],
    laboratoryTestingNote: "Swab tests help spot surface dyes; pesticide residue verification requires GC-MS lab testing."
  }
];
