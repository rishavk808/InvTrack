const express = require('express');
const router = express.Router();
const { login, registerStaff, logout } = require('../Controllers/authController');
const { protect, authorize } = require('../middleware/auth');
// Login route
router.post('/login', login);

// Admin creates staff
router.post('/register-staff', protect, authorize('admin'), registerStaff);

// Logout route
router.post('/logout', protect, logout);

module.exports = router;
