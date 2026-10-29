const express = require('express');
const route = express.Router();

route.use('/auth', require('./auth.route'));
route.use('/products', require('./product.route'));

module.exports = route;
