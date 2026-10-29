const express = require('express');
const { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const productRoute = express.Router();

productRoute.post('/', verifyToken, createProduct);
productRoute.get('/', verifyToken, getProducts);
productRoute.get('/:id', verifyToken, getSingleProduct);
productRoute.put('/:id', verifyToken, updateProduct);
productRoute.delete('/:id', verifyToken, deleteProduct);

module.exports = productRoute;
