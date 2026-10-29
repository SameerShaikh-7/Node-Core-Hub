const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
     },
    sku: {
        type: String,
        required: true,
        unique: true
     },
    category: {
        type: String,
        required: true
     },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    lowStockThreshold: {
        type: Number,
        default: 5
    },
    description: {
        type: String
     },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
     }
});

module.exports = mongoose.model('Product', productSchema, 'Products');
