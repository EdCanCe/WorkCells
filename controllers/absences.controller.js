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

exports.postRequestApprove = (request, response, next) => {
    const absenceId = request.params.absenceID;

    Absence.updateStatus(absenceId, 1) // 1 = Aprobado
        .then(() => {
            response.status(200).json({
                success: true,
                message: "Request approved",
            });
        })
        .catch((error) => {
            console.error("Error approving request:", error);
            response.status(500).json({
                success: false,
                message: "Error processing request",
            });
        });
};

exports.postRequestDeny = (request, response, next) => {
    const absenceId = request.params.absenceID;

    Absence.updateStatus(absenceId, 0) // 0 = Denegado
        .then(() => {
            response.status(200).json({
                success: true,
                message: "Request denied",
            });
        })
        .catch((error) => {
            console.error("Error denying request:", error);
            response.status(500).json({
                success: false,
                message: "Error processing request",
            });
        });
};

exports.getRequest = (request, response, next) => {
    const mensaje = request.session.info || "";
    request.session.info = ""; // Limpiar la sesión después de usar el mensaje

    Absence.fetchAllWithName()
        .then(([rows, fieldData]) => {
            response.render("absenceRequests", {
                isLoggedIn: request.session.isLoggedIn || false,
                csrfToken: request.csrfToken(),
                username: request.session.username || "",
                absences: rows,
                info: mensaje,
                today: new Date(),
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send("Error al obtener los datos.");
        });
    console.log(request.session);
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
            res.send(500);
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

exports.getListPaginated = async (request, response, next) => {
    const page = parseInt(request.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const [rows] = await Absence.getPagination(
            limit,
            offset,
            request.session.userID
        );
        response.json(rows);
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: "Error al obtener las faltas" });
    }
};
