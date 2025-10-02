const Sale = require('../Models/Sale');
const InventoryLog = require('../Models/InventoryLog');
const Product = require('../Models/Product');
const sendNotification = require('../utils/sendNotification');
// Checkout / create invoice
exports.checkout = async (req, res) => {
  try {
    const { items, payments } = req.body;
    let grandTotal = 0;

    const saleItems = await Promise.all(items.map(async i => {
      const product = await Product.findById(i.productId);
      if (!product) throw new Error(`Product not found: ${i.productId}`);

      const lineTotal = i.qty * product.price;
      grandTotal += lineTotal;

      // Decrement stock
      product.stock -= i.qty;
      await product.save();

      // Inventory log
      await InventoryLog.create({
        productId: product._id,
        staffId: req.user.id,
        qtyChange: -i.qty,
        reason: 'SALE'
      });
      // Low stock alert
      if (product.stock <= product.threshold) {
        await sendNotification(product, 'warning');
      }
      return {
        productId: product._id,
        qty: i.qty,
        unitPrice: product.price,
        discount: i.discount || 0,
        taxPercent: product.taxPercent,
        lineTotal
      };
    }));

    const sale = await Sale.create({
      invoiceNumber: 'INV-' + Date.now(),
      staffId: req.user.id,
      items: saleItems,
      payments: payments || [],
      grandTotal,
      status: 'PAID'
    });

    res.json(sale);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all sales (Admin/Staff)
exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('staffId', 'name email');
    res.json(sales);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//Get sale by ID
exports.getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('staffId', 'name email');
    if (!sale) return res.status(404).json({ msg: 'Sale not found' });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
