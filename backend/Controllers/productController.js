const Product = require('../Models/Product');
const sendNotification = require('../utils/sendNotification');
// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
//Get product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// Create product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// Update product (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    // Check stock level for notifications
    if (product.stock <= product.threshold) {
      await sendNotification(product, 'warning');
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Product not found' });

    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
