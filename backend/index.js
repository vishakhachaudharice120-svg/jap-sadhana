require('dotenv').config();
require('express-async-errors');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { validateEnv } = require('./utils/env.utils');

validateEnv();

const passport = require('./config/passport');
const { connectDB } = require('./config/db');
const errorMiddleware = require('./middleware/error.middleware');
const { successResponse, errorResponse } = require('./helpers/response.helper');

const authRoutes = require('./routes/auth.routes');
const chantRoutes = require('./routes/chant.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const reportRoutes = require('./routes/report.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/google' || req.path === '/google/callback',
});

// Routes
app.get('/api/health', (req, res) => {
  res.json(successResponse({ uptime: process.uptime() }, 'OK'));
});
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api', apiLimiter);
app.use('/api/chants', chantRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reports', reportRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json(errorResponse('Route not found', 404));
});

// Global error handler
app.use(errorMiddleware);

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

start();

module.exports = app;
