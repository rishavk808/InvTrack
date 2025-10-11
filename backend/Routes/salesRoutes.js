const express = require('express');
const router = express.Router();
const { checkout, getSales, getSale } = require('../Controllers/salesController');
const { protect, authorize } = require('../middleware/auth');
// Checkout (Staff only, because they handle POS)
router.post('/checkout', protect, authorize('staff'), checkout);
// Get all sales (Admin can see all, Staff can see their own)
router.get('/', protect, getSales);
// Get a sale by ID
router.get('/:id', protect, getSale);
module.exports = router;
