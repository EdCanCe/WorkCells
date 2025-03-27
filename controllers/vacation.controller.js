const Vacation = require("../models/vacation.model");
const User = require("../models/user.model");

exports.getRequests = (request, response, next) => {
  // console.log("Session:", request.session);
  // console.log("UserID from session:", request.session.userID);
  const employeedId = request.session.userID;
  // console.log(employeedId);

  const mensaje = request.session.info || "";
  request.session.info = ""; // Limpiar la sesión después de usar el mensaje

  Vacation.fetchAllWithNames(employeedId)
    .then(([rows, fieldData]) => {
      console.log(rows);
      // Asegúrate de pasar "rows" como "vacations"
      response.render("vacationRequests", {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || "",
        csrfToken: request.csrfToken(),
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
  const mensaje = request.session.info || ""; // Obtén el mensaje de la sesión
  // Limpiar el mensaje después de usarlo
  request.session.info = "";

  User.fetchStartDate(request.session.userID)
    .then(([rows]) => {
      // Obtiene una fecha inicial para ver si ya pasó, o aún no.
      let today = new Date();
      let givenDate = new Date();
      givenDate.setFullYear(givenDate.getUTCFullYear(), rows[0].month - 1 , rows[0].day);

      let firstYear;
      let midYear;
      let lastYear;
      
      
      if (today < givenDate) { // Aún no pasa
        firstYear = givenDate.getUTCFullYear() - 1;
        midYear = givenDate.getUTCFullYear();
        lastYear = givenDate.getUTCFullYear() + 1;
      } else {
        firstYear = givenDate.getUTCFullYear();
        midYear = givenDate.getUTCFullYear() + 1;
        lastYear = givenDate.getUTCFullYear() + 2;
      }

      const firstDate = firstYear + "/" + rows[0].month + "/" + rows[0].day;
      const midDate = midYear + "/" + rows[0].month + "/" + rows[0].day;
      const lastDate = lastYear + "/" + rows[0].month + "/" + rows[0].day;
      
      response.render("addVacation", {
        isLoggedIn: request.session.isLoggedIn || false,
        userID: request.session.userID || 0,
        firstDate: firstDate,
        midDate: midDate,
        lastDate: lastDate,
        info: mensaje,
        csrfToken: request.csrfToken(),
      });
  })
    .catch((error) => {
    console.error(error); // Mejor manejo de error
    response.status(500).send("Error al obtener los datos.");
  });
};

exports.postAddVacation = (request, response, next) => {
  const vacation = new Vacation(
    request.session.userID,
    request.body.startDate,
    request.body.endDate,
    request.body.reason
  );
  console.log(request.session.userID);
  console.log(request.body.startDate);
  console.log(request.body.endDate);
  console.log(request.body.reason);
  vacation.save()
    .then(() =>{
      request.session.info = "Your request was submitted without any problem."
      response.redirect("/calendar");
    })
    .catch((error) => {
      request.session.info = error.message || "There was an error trying to sumbit your request.";
      response.redirect("/vacation/add");
    })
}

exports.getCheckVacation = (request, response, next) => {
  response.render("checkVacation");
};

exports.getModifyVacation = (request, response, next) => {
  response.render("modifyVacation");
};

// TODO: Hacer que, dependiendo si es lider o hr, se actualice el status de la solicitud

exports.postRequestApprove = (request, response, next) => {
  const vacationId = request.params.vacationID;

  Vacation.updateStatusLeader(vacationId, 1) // 1 = Aprobado
    .then(() => {
      response.status(200).json({
        success: true,
        message: "Request approved"
      });
  }).catch((error) => {
    console.error(error);
    response.status(500).json({
      success: false,
      message: "Error processing request"
    });
  });
};

exports.postRequestDeny = (request, response, next) => {
  const vacationId = request.params.vacationID;

  Vacation.updateStatusLeader(vacationId, 0) // 0 = Denegado
    .then(() => {
      response.status(200).json({
        success: true,
        message: "Request denied"
      });
    }).catch((error) => {
      console.error(error);
      response.status(500).json({
        success: false,
        message: "Error processing request"
      });
    });
};





exports.getRoot = (request, response, next) => {
  response.render("ownVacation");
};