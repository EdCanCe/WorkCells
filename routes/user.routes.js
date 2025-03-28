const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user.controller');

// Rutas solo para login y logout
router.get('/', usersController.get_login);
router.post('/', usersController.post_login);
router.get('/logout', usersController.get_logout);

module.exports = router;
