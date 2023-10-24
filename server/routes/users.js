const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post("/login", usersController.handleLogin);

router.get('/logout', usersController.handleLogout);

router.post('/register', usersController.handleRegister);

module.exports = router;
