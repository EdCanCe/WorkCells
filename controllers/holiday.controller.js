const { error } = require("console");
const Holiday = require("../models/holiday.model");

exports.getHolidays = (request, response, next) => {
  const mensaje = request.session.info || ""; // Obtén el mensaje de la sesión

  // Limpiar el mensaje después de usarlo
  request.session.info = "";

  response.render("holiday", {
    isLoggedIn: request.session.isLoggedIn || false,
    info: mensaje, // Pasamos el mensaje de la sesión
    csrfToken: request.csrfToken(),
  });
};

exports.getHolidaysAdd = (request, response, next) => {
  const mensaje = request.session.info || ""; // Obtén el mensaje de la sesión

  Holiday.fetchAll().then(([rows]) => {
    // Limpiar el mensaje después de usarlo
    request.session.info = "";
    response.render("holidayAdd", {
      holidays: rows,
      isLoggedIn: request.session.isLoggedIn || false,
      info: mensaje, // Pasamos el mensaje de la sesión
      csrfToken: request.csrfToken(),
    });
  });
};

exports.postHolidaysAdd = (request, response, next) => {
  const mensaje = request.session.info || ""; // Obtén el mensaje de la sesión

  // Limpiar el mensaje después de usarlo
  request.session.info = "";

  const holiday = new Holiday(
    request.body.usedDate,
    request.body.usedTemplateHolidayIDFK
  );
  console.log(request.body);
  holiday
    .save()
    .then(() => {
      request.session.info = "Dia Feriado registrado correctamente.";
      response.redirect("/holiday");
    })
    .catch((error) => {
      console.error(error);
      request.session.info = error.message || "Error al registrar dia feriado.";
      response.redirect("/holiday/add");
    });
};

exports.getHoliday = (request, response, next) => {
  response.render("holidayCheck");
};

exports.getUsedHoliday = (req, res, next) => {
  const mensaje = req.session.info || "";

  // Limpiar la sesión después de usar el mensaje
  req.session.info = "";

  Holiday.fetchUsedHoliday()
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

exports.getHolidayModify = (request, response, next) => {
  response.render("holidayModify");
};
