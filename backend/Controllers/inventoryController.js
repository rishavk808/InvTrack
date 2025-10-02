const Product = require('../Models/Product');
const InventoryLog = require('../Models/InventoryLog');
const sendNotification = require('../utils/sendNotification');
//Receive new stock (Staff)
exports.receiveStock = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    product.stock += qty;
    await product.save();

    await InventoryLog.create({
      productId,
      staffId: req.user.id,
      qtyChange: qty,
      reason: 'RECEIVE'
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//Adjust stock manually (Staff)
exports.adjustStock = async (req, res) => {
  try {
    const { productId, qty, notes } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    product.stock = qty;
    await product.save();

    await InventoryLog.create({
      productId,
      staffId: req.user.id,
      qtyChange: qty,
      reason: 'ADJUST',
      notes
    });
    // Low stock alert
    if (qty <= product.threshold) {
      await sendNotification(product, 'warning');
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all inventory logs
exports.getInventoryLogs = async (req, res) => {
  try {
    const logs = await InventoryLog.find()
      .populate('productId', 'name sku')
      .populate('staffId', 'name email')
      .populate('relatedInvoiceId', 'invoiceNumber');

    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
