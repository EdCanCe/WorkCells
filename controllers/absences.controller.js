const Absence = require("../models/absence.model");

exports.getCheck = (request, response, next) => {
    response.render("absence_check");
};

exports.getAdd = (request, response, next) => {
    console.log(request.session.mail);
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

exports.getApprove = (request, response, next) => {
    // console.log("Session:", request.session);
    // console.log("UserID from session:", request.session.userID);
    const employeedId = request.session.userID;
    // console.log(employeedId);

    const mensaje = request.session.info || "";
    request.session.info = ""; // Limpiar la sesión después de usar el mensaje

    Absence.fetchAllByID(employeedId)
        .then(([rows, fieldData]) => {
            // Asegúrate de pasar "rows" como "vacations"
            response.render("", {
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
    console.log(request.session.mail);
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
