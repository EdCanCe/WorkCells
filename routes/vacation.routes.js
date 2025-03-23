const express = require("express");
const router = express.Router();

const vacation_controllers = require("../controllers/vacation.controller");
const isAuth = require('../util/is-auth');

router.get("/check",isAuth, vacation_controllers.get_check_vacation);
router.get("/check/modify",isAuth, vacation_controllers.get_modify_vacation);
router.get("/add",isAuth, vacation_controllers.get_add_vacation);
router.get("/approve",isAuth, vacation_controllers.get_approve_vacation);
router.get("/",isAuth, vacation_controllers.get_vacation);

module.exports = router;
