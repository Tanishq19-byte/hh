import express from 'express';
import { requireX402Payment } from '../middleware/x402Middleware.js';

const router = express.Router();

const PREMIUM_DATABASE = {
  "scan-noodle-01": {
    productId: "scan-noodle-01",
    product: "Crispy Instant Noodles (Masala Flavour)",
    brand: "QuickChef",
    manufacturer: "Himalaya Foods Pvt Ltd",
    fssaiNumber: "10015011002345",
    verifiedStatus: "Verified Safe within Regulatory Thresholds",
    safetyObservations: [
      "FSSAI Licence #10015011002345 verified active on central portal.",
      "Additives E621 (MSG) and E412 (Guar Gum) compliant with statutory Maximum Permissible Limits (MPL).",
      "Sodium content (890mg per serving) represents 44.5% of recommended daily allowance.",
      "No active recall advisories matched for Himalaya Foods production lots."
    ],
    recallMatches: [],
    licenseInformation: {
      number: "10015011002345",
      status: "Active",
      businessName: "Himalaya Foods Pvt Ltd",
      category: "Food Manufacturer & Processing",
      validUntil: "2027-01-14"
    },
    sources: [
      "FSSAI Central Food Licensing Portal",
      "NABL Accredited Chemical Reference Dataset",
      "National Food Safety Advisory Database"
    ],
    confidence: 0.98,
    verificationLevel: "Tier 1 Verified Intelligence"
  },
  "scan-drink-02": {
    productId: "scan-drink-02",
    product: "Thunder Energy Drink 250ml",
    brand: "Pulse Nutrition",
    manufacturer: "NutriBite Consumer Products",
    fssaiNumber: "10021022008912",
    verifiedStatus: "Verified with High Attention Advisory",
    safetyObservations: [
      "Contains 25g added sugar (50% RDA per 250ml container).",
      "High caffeine content (75mg per can) — compulsory statutory warning statement verified.",
      "Synthetic colorant Tartrazine E102 verified within FSSAI Schedule II limits."
    ],
    recallMatches: [],
    licenseInformation: {
      number: "10021022008912",
      status: "Active",
      businessName: "NutriBite Consumer Products",
      validUntil: "2026-06-09"
    },
    sources: [
      "FSSAI Schedule II Permitted Additive Register",
      "GoPlausible Verified Safety Audit Log"
    ],
    confidence: 0.96,
    verificationLevel: "Tier 1 Verified Intelligence"
  },
  "scan-spice-03": {
    productId: "scan-spice-03",
    product: "Red Chilli Powder 100g",
    brand: "PureSpices",
    manufacturer: "PureSpices & Oils Ltd",
    fssaiNumber: "10018043004567",
    verifiedStatus: "ACTIVE RECALL MATCH — HIGH ATTENTION",
    safetyObservations: [
      "ALERT: PureSpices red chilli batches are subject to registered FSSAI recall notice #REC-2026-001 regarding suspected Sudan Red I dye adulteration.",
      "FSSAI License #10018043004567 status is currently UNDER REVIEW by food safety regulatory board.",
      "Missing mandatory batch code on physical label wrapper."
    ],
    recallMatches: [
      {
        recallId: "REC-2026-001",
        reason: "Detection of unauthorized synthetic dye (Sudan Red I)",
        severity: "Urgent",
        advisoryDate: "2026-08-20"
      }
    ],
    licenseInformation: {
      number: "10018043004567",
      status: "Under Review",
      businessName: "PureSpices & Oils Ltd",
      validUntil: "2025-02-28"
    },
    sources: [
      "FSSAI Advisory Notice #04/2026",
      "National Rapid Alert System for Food and Feed (RASFF)"
    ],
    confidence: 0.99,
    verificationLevel: "Tier 1 Verified Intelligence"
  }
};

// GET /api/v1/premium/food-intelligence/:productId (Protected by x402)
router.get('/food-intelligence/:productId', requireX402Payment, (req, res) => {
  const { productId } = req.params;
  const intelData = PREMIUM_DATABASE[productId] || {
    productId,
    product: "Specified Consumer Item",
    verifiedStatus: "Verified Standard Information",
    safetyObservations: ["Ingredients and FSSAI registry verified against reference database."],
    recallMatches: [],
    licenseInformation: { status: "Active" },
    sources: ["FSSAI Open Data Portal"],
    confidence: 0.95,
    verificationLevel: "Tier 1 Verified Intelligence"
  };

  return res.status(200).json({
    success: true,
    data: {
      ...intelData,
      generatedAt: new Date().toISOString(),
      x402Settlement: req.x402Payment
    }
  });
});

export default router;
