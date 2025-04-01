const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/google', authController.getGoogleAuth);
router.get('/callback', authController.getGoogleCallback, authController.getGoogleRedirect);

module.exports = router;
