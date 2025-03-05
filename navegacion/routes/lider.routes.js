const express = require("express");
const { request } = require("http");
const router = express.Router();

const lider_controllers = require("../controllers/lider.controllers");

router.get("/check/checkprofileE", lider_controllers.get_equipo);

router.get("/Check/CheckProfileC/kpis", lider_controllers.get_kpisC);

router.get("/check", lider_controllers.get_check);

router.get("/absenceColaborator", lider_controllers.get_absenceC);

router.get("/vacationRequest", lider_controllers.get_requestV);

module.exports = router;
    