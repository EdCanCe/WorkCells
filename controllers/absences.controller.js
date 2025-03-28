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
                message: "Request approved" 
            });
        })
        .catch(error => {
            console.error("Error approving request:", error);
            response.status(500).json({ 
                success: false,
                message: "Error processing request" 
            });
        });
};


exports.postRequestDeny = (request, response, next) => {
    const absenceId = request.params.absenceID;
    
    Absence.updateStatus(absenceId, 0) // 0 = Denegado
        .then(() => {
            response.status(200).json({ 
                success: true,
                message: "Request denied" 
            });
        })
        .catch(error => {
            console.error("Error denying request:", error);
            response.status(500).json({ 
                success: false,
                message: "Error processing request" 
            });
        });
};


exports.getRequest = (request, response, next) => {
    const mensaje = request.session.info || "";
    request.session.info = ""; // Limpiar la sesión después de usar el mensaje
    const limit = 10;
    const offset = 0;
    Absence.fetchPaginated(limit, offset)
        .then(([rows, fieldData]) => {
            response.render("absenceRequests", {
                isLoggedIn: request.session.isLoggedIn || false,
                csrfToken: request.csrfToken(),
                username: request.session.username || "",
                absences: rows,
                info: mensaje,
            });
        })
};


exports.getRequestsPaginated = (request, response, next) => {
    // Recibimos el parámetro "page" desde la query (por defecto 0)
    const page = parseInt(request.query.page) || 0;
    const limit = 10;
    const offset = page * limit;
    Absence.fetchPaginated(limit, offset)
    .then(([rows, fieldData]) => {
        // Se devuelve el arreglo de ausencias (si no hay resultados, se puede enviar un arreglo vacío)
        response.status(200).json(rows);
    })
    .catch(error => {
        console.error("Error al obtener solicitudes paginadas:", error);
        response.status(500).json({ error: "Error al obtener los datos." });
    });
};


exports.postAdd = (request, response, next) => {
    console.log(request.body);
    Absence.getID(request.session.mail)
        .then(([rows]) => {
            if (rows.length === 0) {
                return response.sendStatus(500);
            }
            const userID = rows[0].userID;
            const absence = new Absence(
                request.body.startDate,
                request.body.endDate,
                request.body.reason,
                userID
            );
            return absence.save().then((absenceID) => {
                request.session.info = `Absence from ${absence.startDate} to ${absence.endDate} created`;
                if (request.file) {
                    const media = new AbsenceMedia(
                        request.file.filename,
                        absenceID
                    );
                    return media.save();
                }
                return Promise.resolve(); // Si no hay archivo, simplemente resuelve
            });
        })
        .then(() => {
            response.redirect("/absence");
        })
        .catch((err) => {
            console.log(err);
            response.send(500);
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
