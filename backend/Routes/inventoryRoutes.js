const express = require('express');
const router = express.Router();
const {
  receiveStock,
  adjustStock,
  getInventoryLogs
} = require('../Controllers/inventoryController');
const { protect } = require('../middleware/auth'); 
// Receive new stock
router.post('/receive', protect, receiveStock);
// Adjust stock
router.post('/adjust', protect, adjustStock);
// Get all inventory logs
router.get('/logs', protect, getInventoryLogs);

module.exports = router;

/* 
POST /api/inventory/receive → Add new stock to product.
POST /api/inventory/adjust → Manually set stock for a product (e.g., after physical count).
GET /api/inventory/logs → View all inventory movements (SALE, RECEIVE, ADJUST) with staff info and related invoice if any.
*/