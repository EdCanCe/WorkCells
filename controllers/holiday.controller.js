const holiday = require("../models/holiday.model");

exports.getHolidays = (req, res, next) => {
  res.render("holiday");
};

exports.getHolidaysAdd = (req, res, next) => {
  res.render("holidayAdd");
};

exports.getHoliday = (req, res, next) => {
  res.render("holidayCheck");
};

exports.getUsedHoliday = (req, res, next) => {
  const mensaje = req.session.info || "";

  // Limpiar la sesión después de usar el mensaje
  req.session.info = "";

  holiday
    .fetchAll()
    .then(([rows, fieldData]) => {
      res.render("usedHoliday", {
        isLoggedIn: req.session.isLoggedIn || false,
        username: req.session.username || "",
        holidays: rows, // Cambio aquí por claridad semántica
        info: mensaje,
      });
    })
    .catch((error) => {
      console.error(error); // Mejor manejo de error
      res.status(500).send("Error al obtener los días feriados.");
    });
};

exports.getHolidayModify = (req, res, next) => {
  res.render("holidayModify");
};
