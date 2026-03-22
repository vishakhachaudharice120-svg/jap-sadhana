const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const chantController = require('../controllers/chant.controller');

const router = express.Router();

router.use(authMiddleware);
router.post('/', chantController.addOrUpdate);
router.get('/', chantController.getAll);
router.get('/date/:date', chantController.getByDate);

module.exports = router;
