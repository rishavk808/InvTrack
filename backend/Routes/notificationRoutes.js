const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getNotifications,
  markAsRead,
  deleteNotification,
} = require('../Controllers/notificationController');

const router = express.Router();

router.route('/').get(protect, getNotifications);
router.route('/:id/read').put(protect, markAsRead);
router.route('/:id').delete(protect, deleteNotification);

module.exports = router;
