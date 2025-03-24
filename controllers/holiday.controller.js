const { error } = require("console");
const Holiday = require("../models/holiday.model");

exports.getHolidays = (request, response, next) => {
  response.render("holiday");
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
    usedHolidayID,
    request.body.usedDate,
    request.body.usedTemplateHolidayIDFK
  );

  holiday
    .save()
    .then(() => {
      request.session.info = "Dia Feriado registrado correctamente.";
      response.redirect("/holiday");
    })
    .catch((error) => {
      console.error(error);
      request.session.info = "Error al registrar dia feriado.";
      response.redirect("/holiday/add");
    });
};

exports.getHoliday = (request, response, next) => {
  response.render("holidayCheck");
};

exports.getHolidayModify = (request, response, next) => {
  response.render("holidayModify");
};
