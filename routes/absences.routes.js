const express = require("express");
const router = express.Router();

const absences_controllers = require("../controllers/absences.controllers");

router.get("/aprove", absences_controllers.get_aprove);

router.get("/add", absences_controllers.get_add);

router.get("/check", absences_controllers.get_check);

router.get("/", absences_controllers.get_root);

module.exports = router;
