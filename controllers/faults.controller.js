const Fault = require("../models/faults.model");

exports.getAdd = (request, response, next) => {
  response.render("add_faults", {
    isLoggedIn: request.session.isLoggedIn || false,
    info:  request.session.info || '',
    csrfToken: request.csrfToken(),
  });
};

exports.postAdd = (request, response, next) => {
  console.log(request.body); // Verifica que los datos lleguen correctamente

  // Validación de valores en el cuerpo de la solicitud
  if (!request.body.reason || !request.body.doneDate || !request.body.email) {
    return response.redirect("/error"); // Redirigir a una página de error si faltan datos
  }

  // Crear un nuevo objeto Fault
  const faults = new Fault(
    request.body.reason,
    request.body.doneDate,
    request.body.email
  );

  faults.save()
    .then(() => {
      request.session.info = `Fault of ${faults.email} created`;
      response.redirect("/fault");
    })
    .catch((error) => {
      console.error(error); // Mejor manejo de error
      response.status(500).send("Error al guardar los datos.");
    });
};

exports.getCheck = (request, response, next) => {
  response.render("check_fault");
};

exports.getRoot = (request, response, next) => {
  const mensaje = request.session.info || "";

  // Limpiar la sesión después de usar el mensaje
  request.session.info = "";

  Fault.fetchAll()
    .then(([rows, fieldData]) => {
      response.render("faults", {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || "",
        fault: rows,
        info: mensaje,
      });
    })
    .catch((error) => {
      console.error(error); // Mejor manejo de error
      response.status(500).send("Error al obtener los datos.");
    });
};
