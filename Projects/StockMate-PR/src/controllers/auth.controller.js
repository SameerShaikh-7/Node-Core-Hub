const User = require("../models/user.model");
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
    try {
        const oldUser = await User.findOne({ email: req.body.email });
        if (oldUser) {
            return res.status(400).json({ status: 400, message: "Email is already registered", error: true });
        }

        req.body.createdAt = moment().format('DD/MM/YYYY, h:mm:ss a');
        req.body.updatedAt = moment().format('DD/MM/YYYY, h:mm:ss a');
        req.body.password = await bcrypt.hash(req.body.password, 11);

        const newUser = await User.create(req.body);
        res.status(201).json({ status: 201, message: "User registered successfully", error: false, newUser });
    } catch (err) {
        res.status(500).json({ status: 500, message: "Something went wrong", error: true });
    }
};

module.exports.login = async (req, res) => {
    try {
        const myUser = await User.findOne({ email: req.body.email });
        if (!myUser) {
            return res.status(400).json({ status: 400, message: "Email is not found", error: true });
        }

        const isLogin = await bcrypt.compare(req.body.password, myUser.password);
        if (isLogin) {
            const payload = { id: myUser.id, email: myUser.email, role: myUser.role };
            const token = jwt.sign(payload, process.env.SECRET_KEY || "secret", { expiresIn: "24h" });

            res.status(200).json({ status: 200, message: "Login successful", error: false, token });
        } else {
            res.status(400).json({ status: 400, message: "Password is wrong", error: true });
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: "Something went wrong", error: true });
    }
};

module.exports.profile = async (req, res) => {
    try {
        const userProfile = await User.findById(req.user.id).select("-password");
        res.status(200).json({ status: 200, data: userProfile, error: false });
    } catch (err) {
        res.status(500).json({ status: 500, message: "Something went wrong", error: true });
    }
};
