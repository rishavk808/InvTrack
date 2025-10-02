const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const { connectDB } = require('./lib/db.js');

const app = express();
app.use(cors());
app.use(express.json());
//Apis used
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/sales',salesRoutes);
app.use('/api/inventory',inventoryRoutes);
app.use('/api/notifications',notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on ${PORT}`));