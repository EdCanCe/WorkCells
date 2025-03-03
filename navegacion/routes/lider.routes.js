const express = require("express");
const { request } = require("http");
const router = express.Router();

router.get("/Consultar", (request, response, next) => {
  response.send("consulta");
});

router.get("/AusenciaColaborador", (require, response, next) => {
  response.send("Ausencia de colaborador");
});

router.get("/Consultar/ConsultarPerfil", (require, response, next) => {
  response.send("Equipo");
});

router.get("/Consultar/ConsultarPerfil/kpis", (require, response, next) => {
  response.send("Kpi de colaborador");
});

router.get("/Solicitudvacaciones", (require, response, next) => {
  response.send("Respuesta");
});


module.exports = router;
