import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root Route & Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'FoodVigil Node REST API',
    message: 'Welcome to FoodVigil Backend API Service.',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'FoodVigil Node REST API',
    timestamp: new Date().toISOString()
  });
});

// API v1 Routes
app.use('/api/v1', apiRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    demoFallback: true
  });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `API Route ${req.originalUrl} not found.`
  });
});

app.listen(PORT, () => {
  console.log(`🟢 FoodVigil REST API Server listening on http://localhost:${PORT}`);
});
