const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.controller');
const isAuth = require('../util/is-auth');

router.get('/',isAuth, homeController.get_homepage);
router.post('/',isAuth, homeController.get_homepage);

module.exports = router;