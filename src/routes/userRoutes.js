const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const AuthMiddleware = require('../Middlewares/authMiddleware');

router.get('/', AuthMiddleware.verifyToken, userController.getAllUsers);
router.get('/:id', AuthMiddleware.verifyToken, userController.getUserById);
router.put('/:id',AuthMiddleware.verifyToken, userController.updateUser);
router.delete('/:id',AuthMiddleware.verifyToken, userController.deleteUser);

module.exports = router;
