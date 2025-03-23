const express = require("express");
const router = express.Router();

const absences_controllers = require("../controllers/absences.controllers");
const isAuth = require('../util/is-auth');

router.get("/aprove",isAuth, absences_controllers.get_aprove);

router.get("/add",isAuth, absences_controllers.get_add);

router.get("/check",isAuth, absences_controllers.get_check);

router.get("/", isAuth, absences_controllers.get_root);

module.exports = router;
