const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const reportController = require('../controllers/report.controller');

const router = express.Router();

router.use(authMiddleware, adminMiddleware);
router.get('/summary', reportController.summary);
router.get('/download', reportController.download);

module.exports = router;
