import express from 'express';
import cors from 'cors';
import apiRoutes from '../backend/src/routes/api.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'FoodVigil Vercel Serverless API',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/v1', apiRoutes);

export default app;
