const Product = require("../models/product.model");
const moment = require('moment');

module.exports.createProduct = async (req, res) => {
    try {
        req.body.createdAt = moment().format('DD/MM/YYYY, h:mm:ss a');
        req.body.updatedAt = moment().format('DD/MM/YYYY, h:mm:ss a');

        const newProduct = await Product.create(req.body);
        res.status(201).json({ status: 201, message: "Product added", data: newProduct, error: false });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message, error: true });
    }
};

module.exports.getProducts = async (req, res) => {
    try {
        const { search, category, lowStock } = req.query;
        let filter = {};

        // Search by name
        if (search) filter.name = { $regex: search, $options: "i" };

        // Filter by category
        if (category) filter.category = category;

        // Show low stock products
        if (lowStock === 'true') {
            filter.$expr = { $lte: ["$quantity", "$lowStockThreshold"] };
        }

        const products = await Product.find(filter);
        res.status(200).json({ status: 200, data: products, error: false });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message, error: true });
    }
};

module.exports.getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ status: 200, data: product, error: false });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message, error: true });
    }
};

module.exports.updateProduct = async (req, res) => {
    try {
        req.body.updatedAt = moment().format('DD/MM/YYYY, h:mm:ss a');
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ status: 200, message: "Product updated", data: updatedProduct, error: false });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message, error: true });
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 200, message: "Product deleted", error: false });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message, error: true });
    }
};
