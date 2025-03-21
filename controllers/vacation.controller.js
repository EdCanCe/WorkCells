const Vacation = require("../models/vacation.model");

exports.get_vacation = (request, response, next) => {
  response.render("ownVacation");
};

exports.get_approve_vacation = (request, response, next) => {
  const mensaje = request.session.info || "";
  request.session.info = ""; // Limpiar la sesión después de usar el mensaje

  Vacation.fetchAll()
    .then(([rows, fieldData]) => {
      // Asegúrate de pasar "rows" como "vacations"
      response.render("approveVacation", {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || "",
        vacations: rows, // Pasar correctamente "rows" como "vacations"
        info: mensaje,
      });
    })
    .catch((error) => {
      console.error(error); // Mejor manejo de error
      response.status(500).send("Error al obtener los datos.");
    });
};

exports.get_add_vacation = (request, response, next) => {
  response.render("addVacation");
};

exports.get_check_vacation = (request, response, next) => {
  response.render("checkVacation");
};

exports.get_modify_vacation = (request, response, next) => {
  response.render("modifyVacation");
};
