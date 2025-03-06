const express = require("express");
const router = express.Router();

const superAdmin_controllers = require("../controllers/superAdmin.controllers");

router.get("/diaferiado", superAdmin_controllers.get_dia_feriado);

router.get(
  "/solicitudvacaciones",
  superAdmin_controllers.get_solicitud_vacaciones
);

module.exports = router;
