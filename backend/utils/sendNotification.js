const Notification = require('../Models/Notification');
/**
 * Utility to automatically create notifications (like low-stock alerts)
 * @param {Object} product - The product document triggering the alert
 * @param {String} level - Notification level ('warning' | 'critical')
 */
const sendNotification = async (product, level = 'warning') => {
  try {
    // Create a relevant message
    let message = '';
    if (level === 'critical') {
      message = `⚠️ Critical stock alert! "${product.name}" is almost out of stock (${product.stock} left).`;
    } else {
      message = `Low stock alert: "${product.name}" only has ${product.stock} left.`;
    }

    // Save notification in DB
    const notification = await Notification.create({
      productId: product._id,
      message,
      level,
    });

    // Optional: Emit to frontend via Socket.io if enabled
    if (global.io) {
      global.io.emit('new-notification', {
        id: notification._id,
        productName: product.name,
        message: notification.message,
        level: notification.level,
        createdAt: notification.createdAt,
      });
    }

    console.log(`📢 Notification created for ${product.name}: ${message}`);
    return notification;
  } catch (error) {
    console.error('❌ Error sending notification:', error.message);
  }
};

module.exports = sendNotification;
