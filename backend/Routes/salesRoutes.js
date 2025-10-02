const express = require('express');
const router = express.Router();
const { checkout, getSales, getSale } = require('../controllers/salesController');
const auth = require('../middleware/auth');
const { authorize } = require('../middleware/auth');
// Checkout (Staff only, because they handle POS)
router.post('/checkout', auth, authorize('staff'), checkout);
// Get all sales (Admin can see all, Staff can see their own)
router.get('/', auth, getSales);
// Get a sale by ID
router.get('/:id', auth, getSale);
module.exports = router;
