const Absence = require("../models/absence.model");
const AbsenceMedia = require("../models/absenceMedia.model");
const sessionVars = require("../util/sessionVars");
const { sendTemplateMessage } = require("../util/whatsAppMessages");
const title = "Absences";
const pdfName = "absences";

exports.getCheck = (request, response, next) => {
    response.render("absence_check", {
        ...sessionVars(request, title, pdfName),
    });
};

exports.getAdd = (request, response, next) => {
    response.render("absencesAdd", { ...sessionVars(request, title, pdfName) });
};

exports.postRequestApprove = async (request, response, next) => {
    try {
        const absenceId = request.params.absenceID;
        const userRole = request.session.role;

        const [absenceRows] = await Absence.fetchOne(absenceId);
        if (absenceRows.length === 0) {
            return response.status(404).json({
                success: false,
                message: "Solicitud no encontrada",
            });
        }
        const [employeeRows] = await Absence.fetchOneEmployee(
            absenceRows[0]["absenceUserIDFK"]
        );
        // TODO: CAMBIAR LA VARIABLE phoneNumber A ALGO PARECIDO A LA VARIABLE "employeeName" PUES POR AHORA
        // TODO: SÓLO UNA VARIABLE DE ENTORNO.
        const phoneNumber = process.env.NUMBER_TEST;
        const requestName = "ausencia";
        const employeeName = employeeRows[0]["birthName"];
        const statusName = "aprobado";
        let roleName;
        if (userRole === "Manager") {
            roleName = "Recursos humanos";
            try {
                await sendTemplateMessage(
                    phoneNumber,
                    employeeName,
                    requestName,
                    statusName,
                    roleName
                );
                await Absence.updateStatusHR(absenceId, 1);
            } catch (error) {
                console.error(
                    "Error al enviar el template:",
                    error.response ? error.response.data : error.message
                );
                return response.status(500).json({
                    success: false,
                    message: error.message || "Error al procesar la solicitud",
                });
            }
        } else if (userRole === "Department Leader") {
            roleName = "Lider de departamento";
            try {
                await sendTemplateMessage(
                    phoneNumber,
                    employeeName,
                    requestName,
                    statusName,
                    roleName
                );
                await Absence.updateStatusLeader(absenceId, 1);
                // await Absence.fetchDepartmentPaginated(userId, 1, 0);
            } catch (error) {
                console.error(
                    "Error al enviar el template:",
                    error.response ? error.response.data : error.message
                );
                return response.status(500).json({
                    success: false,
                    message: error.message || "Error al procesar la solicitud",
                });
            }
        } else {
            return response.status(403).json({
                success: false,
                message: "Rol no autorizado",
            });
        }
        return response.status(200).json({
            success: true,
            message: "Solicitud aprobada exitosamente",
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: error.message || "Error al procesar la solicitud",
        });
    }
};

exports.postRequestDeny = async (request, response, next) => {
    try {
        const absenceId = request.params.absenceID;
        const userRole = request.session.role;
        const userId = request.session.userID;
        const [absenceRows] = await Absence.fetchOne(absenceId);
        if (absenceRows.length === 0) {
            return response.status(404).json({
                success: false,
                message: "Solicitud no encontrada",
            });
        }
        const [employeeRows] = await Absence.fetchOneEmployee(
            absenceRows[0]["absenceUserIDFK"]
        );
        // TODO: CAMBIAR LA VARIABLE phoneNumber A ALGO PARECIDO A LA VARIABLE "employeeName" PUES POR AHORA
        // TODO: SÓLO UNA VARIABLE DE ENTORNO.
        const phoneNumber = process.env.NUMBER_TEST;
        const requestName = "ausencia";
        const employeeName = employeeRows[0]["birthName"];
        const statusName = "denegado";
        let roleName;
        // En el controlador absences.controller.js
        if (userRole === "Manager") {
            roleName = "Recursos humanos";
            try {
                await sendTemplateMessage(
                    phoneNumber,
                    employeeName,
                    requestName,
                    statusName,
                    roleName
                );
                await Absence.updateStatusHR(absenceId, 0);
            } catch (error) {
                console.error(
                    "Error al enviar el template:",
                    error.response ? error.response.data : error.message
                );
                return response.status(500).json({
                    success: false,
                    message: error.message || "Error al procesar la solicitud",
                });
            }
        } else if (userRole === "Department Leader") {
            roleName = "Lider de departamento";
            try {
                await sendTemplateMessage(
                    phoneNumber,
                    employeeName,
                    requestName,
                    statusName,
                    roleName
                );
                await Absence.updateStatusLeader(absenceId, 0);
                // await Absence.fetchDepartmentPaginated(userId, 1, 0);
            } catch (error) {
                console.error(
                    "Error al enviar el template:",
                    error.response ? error.response.data : error.message
                );
                return response.status(500).json({
                    success: false,
                    message: error.message || "Error al procesar la solicitud",
                });
            }
        } else {
            return response.status(403).json({
                success: false,
                message: "Rol no autorizado",
            });
        }
        return response.status(200).json({
            success: true,
            message: "Solicitud aprobada exitosamente",
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: error.message || "Error al procesar la solicitud",
        });
    }
};

exports.getRequests = (request, response, next) => {
    const userId = request.session.userID;
    const userRole = request.session.role;
    const limit = 10;
    const offset = 0;
    let fetchPromise;
    if (userRole === "Manager" || userRole === "Department Leader") {
        // Usar el método fetchPaginated actualizado que maneja ambos roles
        // SELECT * FROM user WHERE user.prioritaryDepartmentIDFK = 'cbf52319-0026-40ff-bf1e-2e48f1dc8b94';
        fetchPromise = Absence.fetchPaginated(limit, offset, userRole, userId);
    } else {
        // Como fallback, se podrían cargar sólo las solicitudes del usuario o definir otra lógica
        fetchPromise = Absence.fetchPaginated(limit, offset, userRole, userId);
    }

    fetchPromise
        .then(([rows]) => {
            response.render("absenceRequests", {
                ...sessionVars(request, title, pdfName),
                absences: rows,
                role: userRole,
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
    let fetchPromise;
    console.log(userId);
    if (userRole === "Manager" || userRole === "Department Leader") {
        // Usar el método fetchPaginated actualizado que maneja ambos roles
        fetchPromise = Absence.fetchAllPaginated(
            limit,
            offset,
            userRole,
            userId
        );
    } else {
        // Como fallback, se podrían cargar sólo las solicitudes del usuario o definir otra lógica
        fetchPromise = Absence.fetchAll(userId);
    }
    fetchPromise
        .then(([rows]) => {
            response.render("absenceAllRequests", {
                ...sessionVars(request, title, pdfName),
                absences: rows,
                role: userRole,
            });
            console.log(rows);
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
    const showAll = request.query.all === "true";

    let fetchPromise;
    if (userRole === "Manager" && showAll) {
        fetchPromise = Absence.fetchAllPaginated(
            limit,
            offset,
            userRole,
            userId
        );
    } else if (userRole === "Department Leader" && showAll) {
        fetchPromise = Absence.fetchAllPaginated(
            limit,
            offset,
            userRole,
            userId
        );
    } else {
        fetchPromise = Absence.fetchPaginated(limit, offset, userRole, userId);
    }

    fetchPromise
        .then(([rows]) => {
            const absences = Array.isArray(rows) ? rows : [];
            response.status(200).json(absences);
        })
        .catch((error) => {
            console.error("Error fetching paginated requests:", error);
            response.status(500).json({
                success: false,
                message: `Error al cargar las solicitudes: ${error.message}`,
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
    // console.log(request.session);
    Absence.fetchAllByID(request.session.userID)
        .then(([rows, fieldData]) => {
            // console.log(fieldData);
            // console.log(rows);
            response.render("absencesList", {
                ...sessionVars(request, title, pdfName),
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
