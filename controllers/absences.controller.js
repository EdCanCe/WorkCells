const Absence = require("../models/absence.model");
const AbsenceMedia = require("../models/absenceMedia.model");

exports.getCheck = (request, response, next) => {
    response.render("absence_check");
};

exports.getAdd = (request, response, next) => {
    Absence.fetchAll()
        .then(([absences, fieldData]) => {
            response.render("absencesAdd", {
                csrfToken: request.csrfToken(),
                absences: absences,
                info: request.session.info || "",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// exports.postDenyRequest = (request, response, next) => {
//   response.status(200).json({message: "Respuesta asíncrona"});
// }

exports.postDenyRequest = (request, response, next) => {
  response.status(200).json({ message: "Deny response sent" });
};

exports.postApproveRequest = (request, response, next) => {
  response.status(200).json({ message: "Approved successfully" });
};

exports.getApprove = (request, response, next) => {

    const mensaje = request.session.info || "";
    request.session.info = ""; // Limpiar la sesión después de usar el mensaje

    
    Absence.fetchAllWithName()
    .then(([rows, fieldData]) => {
      // Asegúrate de pasar "rows" como "vacations"
      response.render("absenceApprove", {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || "",
        absences: rows, // Pasar correctamente "rows" como "absence"
        info: mensaje,
      });
    })
    .catch((error) => {
      console.error(error); // Mejor manejo de error
      response.status(500).send("Error al obtener los datos.");
    });
    console.log(request.session);
  };

exports.postAdd = (request, response, next) => {
    console.log(request.body);
    Absence.getID(request.session.mail).then(([rows]) => {
        if (rows.length == 0) {
            response.send(500);
        }
        const userID = rows[0].userID;
        const absence = new Absence(
            request.body.startDate,
            request.body.endDate,
            request.body.reason,
            userID
        );
        absence
            .save()
            .then(() => {
                request.session.info = `Absence from ${absence.startDate} to ${absence.endDate} created`;
                response.redirect("/absence");
            })
            .catch((err) => {
                console.log(err);
            });
    });
};

exports.getRoot = (request, response, next) => {
    const mensaje = request.session.info || "";
    if (request.session.info) {
        request.session.info = "";
    }
    Absence.getID(request.session.mail).then(([rows]) => {
        if (rows.length == 0) {
            response.send(500);
        }
        const userID = rows[0].userID;
        Absence.fetchAllByID(userID)
            .then(([rows, fieldData]) => {
                console.log(fieldData);
                console.log(rows);
                response.render("absencesList", {
                    absences: rows,
                    info: mensaje,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
