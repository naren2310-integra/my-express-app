const bcrypt = require("bcryptjs");
const authModel = require('../models/authModel');
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");
const userService = require("../services/userService");

// Register User
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await authModel.findOne({ email });

        if (existingUser) return res.status(400).json({ error: "Email already in use" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await authModel.create({ name, email, password: hashedPassword });

        await userService.createUser({name, email});

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔵 Login User & Generate JWT
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await authModel.findOne({ email });

        if (!user) return res.status(400).json({ error: "Incorrect email" });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) return res.status(401).json({ error: "Invalid password" });

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Store token in database
        await Token.create({ userId: user._id, token });

        res.json({ message: "Login successful", email: user.email, accessToken: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    Login,
    registerUser
}