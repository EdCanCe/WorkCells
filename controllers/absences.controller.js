const Absence = require("../models/absence.model");
const AbsenceMedia = require("../models/absenceMedia.model");

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

exports.postAdd = (req, res, next) => {
    console.log(req.body);
    Absence.getID(req.session.mail)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.sendStatus(500);
            }
            const userID = rows[0].userID;
            const absence = new Absence(
                req.body.startDate,
                req.body.endDate,
                req.body.reason,
                userID
            );
            return absence.save().then((absenceID) => {
                req.session.info = `Absence from ${absence.startDate} to ${absence.endDate} created`;
                if (req.file) {
                    const media = new AbsenceMedia(
                        req.file.filename,
                        absenceID
                    );
                    return media.save();
                }
                return Promise.resolve(); // Si no hay archivo, simplemente resuelve
            });
        })
        .then(() => {
            res.redirect("/absence");
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
};

exports.getRoot = (req, res, next) => {
    const mensaje = req.session.info || "";
    if (req.session.info) {
        req.session.info = "";
    }
    console.log(req.session.mail);
    Absence.getID(req.session.mail).then(([rows]) => {
        if (rows.length == 0) {
            res.send(500);
        }
        const userID = rows[0].userID;
        Absence.fetchAllByID(userID)
            .then(([rows, fieldData]) => {
                console.log(fieldData);
                console.log(rows);
                res.render("absencesList", {
                    absences: rows,
                    info: mensaje,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
