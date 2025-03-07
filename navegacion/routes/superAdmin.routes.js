const express = require("express");
const router = express.Router();

const superAdmin_controllers = require("../controllers/superAdmin.controllers");

router.get("/diaferiado", superAdmin_controllers.get_dia_feriado);

router.get(
  "/solicitudvacaciones",
  superAdmin_controllers.get_solicitud_vacaciones
);

router.get('/addDepartments/checkProfile', superAdmin_controllers.get_profile);
router.get('/addDepartments/1', superAdmin_controllers.get_departments);
router.get('/addDepartments', superAdmin_controllers.get_departments);

router.get('/faults', superAdmin_controllers.get_faults)
module.exports = router;
