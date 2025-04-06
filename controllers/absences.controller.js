const Absence = require("../models/absence.model");
const AbsenceMedia = require("../models/absenceMedia.model");
const sessionVars = require("../util/sessionVars");

exports.getCheck = (request, response, next) => {
    response.render("absence_check", {
        ...sessionVars(request),
    });
};

exports.getAdd = (request, response, next) => {
    response.render("absencesAdd", { ...sessionVars(request) });
};

exports.postRequestApprove = (request, response, next) => {
    const absenceId = request.params.absenceID;
    const userRole = request.session.role;

    // Aquí solo verificamos el rol ya que la autorización ya se maneja en el middleware absencePrivilege
    if (userRole === 'Human Resources' || userRole === 'Department Leader') {
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
    } else {
        response.status(403).json({
            success: false,
            message: "No tienes permisos para realizar esta acción",
        });
    }
};

exports.postRequestDeny = (request, response, next) => {
    const absenceId = request.params.absenceID;
    const userRole = request.session.role;

    // Aquí solo verificamos el rol ya que la autorización ya se maneja en el middleware absencePrivilege
    if (userRole === 'Human Resources' || userRole === 'Department Leader') {
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
    } else {
        response.status(403).json({
            success: false,
            message: "No tienes permisos para realizar esta acción",
        });
    }
};

exports.getRequest = (request, response, next) => {
    const userId = request.session.userID;
    const userRole = request.session.role;
    const limit = 10;
    const offset = 0;
    
    Absence.fetchPaginated(limit, offset, userRole, userId)
        .then(([rows, fieldData]) => {
            response.render("absenceRequests", {
                ...sessionVars(request),
                absences: rows,
                today: new Date(),
                role: userRole
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send("Error al obtener los datos.");
        });
};

exports.getAllRequests = (request, response, next) => {
    const userId = request.session.userID;
    const userRole = request.session.role;
    const limit = 10;
    const offset = 0;
    
    Absence.fetchAllPaginated(limit, offset, userRole, userId)
        .then(([rows, fieldData]) => {
            response.render("absenceAllRequests", {
                ...sessionVars(request),
                absences: rows,
                today: new Date(),
                role: userRole
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send("Error al obtener los datos.");
        });
};

exports.getRequestsPaginated = (request, response, next) => {
    const page = parseInt(request.query.page) || 0;
    const limit = 10;
    const offset = page * limit;
    const userId = request.session.userID;
    const userRole = request.session.role;
    const showAll = request.query.all === 'true';
    
    let fetchPromise;
    if (userRole === 'Human Resources' && showAll) {
        fetchPromise = Absence.fetchAllPaginated(limit, offset, userRole, userId);
    } 
    else if (userRole === 'Department Leader' && showAll) {
        fetchPromise = Absence.fetchAllPaginated(limit, offset, userRole, userId);
    }
    else {
        fetchPromise = Absence.fetchPaginated(limit, offset, userRole, userId);
    }
    
    fetchPromise
        .then(([rows]) => {
            const absences = Array.isArray(rows) ? rows : [];
            response.status(200).json(absences);
        })
        .catch((error) => {
            console.error('Error fetching paginated requests:', error);
            response.status(500).json({ 
                success: false, 
                message: `Error al cargar las solicitudes: ${error.message}` 
            });
        });
};

exports.postAdd = (request, response, next) => {
    console.log(request.body);
    const absence = new Absence(
        request.body.startDate,
        request.body.endDate,
        request.body.reason,
        request.session.userID
    );
    absence
        .save()
        .then((absenceID) => {
            request.session.info = `Absence from ${absence.startDate} to ${absence.endDate} created`;
            if (request.file) {
                const media = new AbsenceMedia(
                    request.file.filename,
                    absenceID
                );
                return media.save();
            }
            return Promise.resolve(); // Si no hay archivo, simplemente resuelve
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
    Absence.fetchAllByID(request.session.userID)
        .then(([rows, fieldData]) => {
            console.log(fieldData);
            console.log(rows);
            response.render("absencesList", {
                ...sessionVars(request),
                absences: rows,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getListPaginated = async (request, response, next) => {
    const page = parseInt(request.query.page) || 1;
    const limit = 5;
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
