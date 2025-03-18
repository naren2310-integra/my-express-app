const express = require('express');
const router = express.Router();
const authController = require('./../controllers/AuthController');

router.post('/register', authController.registerUser);
router.post('/login', authController.Login);
router.post('/refershtoken', authController.refreshToken);

module.exports = router;
