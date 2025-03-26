const express = require("express");
const router = express.Router();

const oneToOneController = require("../controllers/oneToOne.controller.js");
const isAuth = require("../util/is-auth");

router.get("/", isAuth, oneToOneController.getOneToOne);

router.get("/schedule", isAuth, oneToOneController.getOneToOneSchedule);
router.post("/schedule", oneToOneController.postOneToOneSchedule);

router.get("/:sessionID/fill", isAuth, oneToOneController.getOneToOneFill);
router.post("/:sessionID/fill", isAuth, oneToOneController.postOneToOneFill);

router.get("/graphs", isAuth, oneToOneController.getOneToOneGraphs);

router.get("/check", isAuth, oneToOneController.getOneToOneCheck);

module.exports = router;