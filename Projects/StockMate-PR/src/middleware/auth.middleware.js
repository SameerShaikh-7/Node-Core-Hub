const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ status: 403, message: "Token is required", error: true });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY || "secret");
        req.user = decoded;
        next();
    } catch (err)
    {
        return res.status(401).json({ status: 401, message: "Invalid Token", error: true });
    }
};
