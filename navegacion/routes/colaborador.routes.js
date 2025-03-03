const express = require("express");
const { request } = require("http");
const router = express.Router();

router.get("/Calendario", (request, response, next) => {
  response.send("calendario");
});

router.get("/miperfil", (require, response, next) => {
  response.send("mi perfil");
});

router.get("/miperfil/kpis", (require, response, next) => {
  response.send("kpis");
});

router.get("/Calendario/ausencias", (require, response, next) => {
  response.send("Ausencias");
});

router.get("/Calendario/vacaciones", (require, response, next) => {
  response.send("Ausencias");
});

router.get("/Calendario/oneonOne", (require, response, next) => {
  response.send("Ausencias");
});

module.exports = router;
