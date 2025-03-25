const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.controller');
const isAuth = require('../util/is-auth');

router.get('/',isAuth, homeController.getHomepage);
router.post('/',isAuth, homeController.getHomepage); //No se si esto debería de estar xd - Mau.
router.get('/logout', isAuth, homeController.getLogout);


module.exports = router;