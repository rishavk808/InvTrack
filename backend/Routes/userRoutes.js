const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../Controllers/userController');

const { protect, authorize } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', protect, authorize('admin'), getUsers);

// Get single user (admin or same user)
router.get('/:id', protect, getUserById);

// Update user (admin or same user)
router.put('/:id', protect, updateUser);

// Delete user (admin only)
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;

/* 
Flow
GET /api/users → Admin gets all users.
GET /api/users/:id → Admin or same user can view details.
PUT /api/users/:id → Admin can update anyone, staff can only update themselves.
DELETE /api/users/:id → Admin only.
*/
