const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const auth = require('../middleware/auth');
const { authorize } = require('../middleware/auth');

// Public or staff-accessible (depending on your design)
router.get('/', auth, getProducts);
router.get('/:id', auth, getProduct);

// Admin-only routes
router.post('/', auth, authorize('admin'), createProduct);
router.put('/:id', auth, authorize('admin'), updateProduct);
router.delete('/:id', auth, authorize('admin'), deleteProduct);

module.exports = router;

/* 
Flow 
GET /api/products → staff/admin can view products
GET /api/products/:id → staff/admin can view details
POST /api/products → only admin can create
PUT /api/products/:id → only admin can update
DELETE /api/products/:id → only admin can delete
*/