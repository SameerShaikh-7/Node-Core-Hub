const express = require('express');
require('dotenv').config();
const cors = require('cors');

// 1. Import DB Configuration
require('./config/db.config');

const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');

const app = express();
app.use(express.json());
app.use(cors());


// 3. Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
