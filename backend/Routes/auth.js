const express = require('express');
const router = express.Router();
const { login, registerStaff, logout } = require('../controllers/authController');
const auth = require('../middleware/auth');
const { authorize } = require('../middleware/auth');
// Login route
router.post('/login', login);

// Admin creates staff
router.post('/register-staff', auth, authorize('admin'), registerStaff);

// Logout route
router.post('/logout', auth, logout);

module.exports = router;
