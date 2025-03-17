const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");

const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"]; // Extract Bearer Token

    if (!token) {
        return res.status(403).json({ error: "Access denied. No token provided." });
    }

    try {
        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request

        // Check if token exists in DB
        const storedToken = await Token.findOne({ token: token });

        if (!storedToken) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }

        next(); // Proceed to the next middleware/controller
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" });
    }
};

module.exports = {
    verifyToken
};
