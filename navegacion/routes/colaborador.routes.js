const express = require("express");
const { request } = require("http");
const router = express.Router();

const colaborador_controllers = require("../controllers/colaborador.controllers");

router.get(
  "/myprofile/moreinfo/administrativeoffenses",
  colaborador_controllers.get_administrativeoffenses
);

router.get("/myprofile/moreinfo/kpis", colaborador_controllers.get_kpis);

router.get("/myprofile/moreinfo", colaborador_controllers.get_moreinformation);

router.get("/calendar/absence", colaborador_controllers.get_absence);

router.get("/calendar/vacation", colaborador_controllers.get_vacation);

router.get("/calendar/onetoOne", colaborador_controllers.get_onetoOne);

router.get("/calendar", colaborador_controllers.get_calendar);

router.get("/myprofile", colaborador_controllers.get_myprofile);

router.get("/", colaborador_controllers.get_root);

module.exports = router;
