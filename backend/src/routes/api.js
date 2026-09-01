import express from 'express';
import {
  scanFoodLabel,
  analyzeLabelText,
  getProducts,
  verifyBusiness,
  getRecalls,
  getAlerts,
  createReport,
  getReports,
  createEvidence,
  getUserDashboard
} from '../controllers/foodController.js';

const router = express.Router();

// Route definitions adhering to specification section 15
router.post('/scan', scanFoodLabel);
router.post('/analyze-label', analyzeLabelText);
router.get('/products', getProducts);
router.get('/business/verify', verifyBusiness);
router.get('/recalls', getRecalls);
router.get('/alerts', getAlerts);
router.post('/reports', createReport);
router.get('/reports', getReports);
router.post('/evidence', createEvidence);
router.get('/user/dashboard', getUserDashboard);

export default router;
