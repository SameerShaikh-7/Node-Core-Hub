const express = require('express');
const { register, login, profile } = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const authRoute = express.Router();

authRoute.post('/register', register);
authRoute.post('/login', login);
authRoute.get('/profile', verifyToken, profile);

module.exports = authRoute;
