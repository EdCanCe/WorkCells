const express = require("express");
const router = express.Router();

const vacation_controllers = require("../controllers/vacation.controller");

router.get("/check", vacation_controllers.get_check_vacation);
router.get("/check/modify", vacation_controllers.get_modify_vacation);
router.get("/add", vacation_controllers.get_add_vacation);
router.get("/approve", vacation_controllers.get_approve_vacation);
router.get("/", vacation_controllers.get_vacation);

module.exports = router;
