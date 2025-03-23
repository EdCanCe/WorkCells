const Employee = require("../models/employee.model");

exports.getAdd = (request, response, next) => {
  response.render("employeeAdd", {
    isLoggedIn: request.session.isLoggedIn || false,
    info: request.session.info || "",
    csrfToken: request.csrfToken(),
  });
};

exports.postAdd = (request, response, next) => {
  const employee = new Employee(
    request.body.curp,
    request.body.rfc,
    request.body.birthName,
    request.body.surname,
    request.body.mail,
    request.body.zipCode,
    request.body.houseNumber,
    request.body.streetName,
    request.body.colony,
    request.body.workModality,
    request.body.userRoleIDFK,
    request.body.countryUserIDFK
  );
  employee
    .save()
    .then(() => {
      request.session.info = `Employee created`;
      response.redirect("/employee");
    })
    .catch((error) => {
      console.error(error); // Mejor manejo de error
      response.status(500).send("Error al guardar los datos.");
    });
};

exports.getModify = (request, response, next) => {
  response.render("employeeCheckModify");
};

exports.getCheck = (request, response, next) => {
  response.render("employeeCheck");
};

exports.getMe = (request, response, next) => {
  response.render("employeeMe");
};

exports.getRoot = (request, response, next) => {
  const mensaje = request.session.info || "";

  // Limpiar la sesión después de usar el mensaje
  request.session.info = "";

  response.render("employee", {
    isLoggedIn: request.session.isLoggedIn || false,
    username: request.session.username || "",
    info: mensaje, // Aquí pasamos el mensaje de éxito o error
  });
};
