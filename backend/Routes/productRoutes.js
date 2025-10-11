const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../Controllers/productController');

const { protect, authorize } = require('../middleware/auth');

// Public or staff-accessible (depending on your design)
router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);

// Admin-only routes
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;

/* 
Flow 
GET /api/products → staff/admin can view products
GET /api/products/:id → staff/admin can view details
POST /api/products → only admin can create
PUT /api/products/:id → only admin can update
DELETE /api/products/:id → only admin can delete
*/
