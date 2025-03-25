const express = require("express");
const router = express.Router();

const vacation_controllers = require("../controllers/vacation.controller");
const isAuth = require('../util/is-auth');

router.get("/check",isAuth, vacation_controllers.getCheckVacation);
router.get("/check/modify",isAuth, vacation_controllers.getModifyVacation);
router.get("/add",isAuth, vacation_controllers.getAddVacation);
router.get("/approve",isAuth, vacation_controllers.getApproveVacation);
router.get("/",isAuth, vacation_controllers.getVacation);

module.exports = router;
