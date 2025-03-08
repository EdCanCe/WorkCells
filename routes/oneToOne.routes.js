const express = require("express");
const router = express.Router();

const oneToOneController = require("../controllers/oneToOne.controller.js");

router.get("/", oneToOneController.getOneToOne);

router.get("/schedule", oneToOneController.getOneToOneSchedule);

router.get("/check/fill", oneToOneController.getOneToOneFill);

router.get("/graphs", oneToOneController.getOneToOneGraphs);

router.get("/check", oneToOneController.getOneToOneCheck);

module.exports = router;
