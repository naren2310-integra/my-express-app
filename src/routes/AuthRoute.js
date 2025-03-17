const express = require('express');
const router = express.Router();
const authController = require('./../controllers/AuthController');

router.post('/register', authController.registerUser);
router.post('/login', authController.Login);

module.exports = router;
