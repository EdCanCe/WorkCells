const express = require("express");
const router = express.Router();

const oneToOneController = require("../controllers/oneToOne.controller.js");
const isAuth = require("../util/is-auth");
const OTO = require("../util/OneToOnePrivilege/OneToOnePrivilege.js");

router.get("/check/all", isAuth, OTO, oneToOneController.getSearchAll);
router.get("/check/own", isAuth, oneToOneController.getSearchOwn);
router.get("/", isAuth, oneToOneController.getOneToOne);

router.get("/schedule", isAuth, OTO, oneToOneController.getOneToOneSchedule);
router.post("/schedule", isAuth, OTO, oneToOneController.postOneToOneSchedule);

// Muestra los datos de una sesión
router.get("/:sessionID", isAuth, oneToOneController.getOneToOneCheck);

// Rellena los datos de una sesión previamente agendada
router.get("/:sessionID/fill", isAuth, OTO, oneToOneController.getOneToOneFill);
router.post(
    "/:sessionID/fill",
    isAuth,
    OTO,
    oneToOneController.postOneToOneFill
);

router.get("/graphs", isAuth, oneToOneController.getOneToOneGraphs);

router.get("/getFullName/:email", isAuth, oneToOneController.getFullName);

module.exports = router;
