const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const analyticsController = require('../controllers/analytics.controller');

const router = express.Router();

router.use(authMiddleware);
router.get('/summary', analyticsController.summary);
router.get('/monthly', analyticsController.monthly);

module.exports = router;
