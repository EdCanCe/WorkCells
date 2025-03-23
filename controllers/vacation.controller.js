const Vacation = require("../models/vacation.model");

exports.getVacation = (request, response, next) => {
  response.render("ownVacation");
};

exports.getApproveVacation = (request, response, next) => {
  console.log("Session:", request.session);
  console.log("UserID from session:", request.session.userID);
  const employeedId = request.session.userID;
  console.log(employeedId);

  const mensaje = request.session.info || "";
  request.session.info = ""; // Limpiar la sesión después de usar el mensaje

  Vacation.fetchAll(employeedId)
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

exports.getAddVacation = (request, response, next) => {
  response.render("addVacation");
};

exports.getCheckVacation = (request, response, next) => {
  response.render("checkVacation");
};

exports.getModifyVacation = (request, response, next) => {
  response.render("modifyVacation");
};
