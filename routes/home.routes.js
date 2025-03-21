const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.controller');

router.get('/', homeController.get_homepage);
router.post('/', homeController.get_homepage);

module.exports = router;