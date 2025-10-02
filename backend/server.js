const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./lib/db');

const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const salesRoutes = require('./Routes/salesRoutes');
const inventoryRoutes = require('./Routes/inventoryRoutes');
const notificationRoutes = require('./Routes/notificationRoutes');

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

// APIs used:
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Inventory & Billing Management API is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
