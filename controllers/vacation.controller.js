const Vacation = require("../models/vacation.model");
const User = require("../models/user.model");
const sessionVars = require('../util/sessionVars');

exports.getRequests = (request, response, next) => {
    const userId = request.session.userID;
    const userRole = request.session.role;
    const limit = 10;
    const offset = 0;
    
    let fetchPromise;

    if (userRole === "Human Resources" || userRole === "Department Leader") {
        // Usar el método fetchPaginated actualizado que maneja ambos roles
        fetchPromise = Vacation.fetchPaginated(limit, offset, userRole, userId);
    } else {
        // Como fallback, se podrían cargar sólo las solicitudes del usuario o definir otra lógica
        fetchPromise = Vacation.fetchAllVacation(userId);
    }

    fetchPromise
        .then(([rows]) => {
            response.render("vacationRequests", {
                ...sessionVars(request),
                vacations: rows,
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

    Vacation.fetchPaginated(limit, offset, userRole, userId)
        .then(([rows]) => {
            // Asegurarse de que rows es un array antes de enviarlo
            const vacations = Array.isArray(rows) ? rows : [];
            response.status(200).json(vacations);
        })
        .catch((error) => {
            console.error("Error fetching paginated requests:", error);
            response.status(500).json({ 
                success: false, 
                message: "Error al cargar las solicitudes." 
            });
        });
};


exports.getAddVacation = (request, response, next) => {
    User.fetchStartDate(request.session.userID)
        .then(([rows]) => {
            // Obtiene una fecha inicial para ver si ya pasó, o aún no.
            let today = new Date();
            let givenDate = new Date();
            givenDate.setFullYear(
                givenDate.getUTCFullYear(),
                rows[0].month - 1,
                rows[0].day
            );

            let firstYear;
            let midYear;
            let lastYear;

            if (today < givenDate) {
                // Aún no pasa
                firstYear = givenDate.getUTCFullYear() - 1;
                midYear = givenDate.getUTCFullYear();
                lastYear = givenDate.getUTCFullYear() + 1;
            } else {
                firstYear = givenDate.getUTCFullYear();
                midYear = givenDate.getUTCFullYear() + 1;
                lastYear = givenDate.getUTCFullYear() + 2;
            }

            const firstDate =
                firstYear + "/" + rows[0].month + "/" + rows[0].day;
            const midDate = midYear + "/" + rows[0].month + "/" + rows[0].day;
            const lastDate = lastYear + "/" + rows[0].month + "/" + rows[0].day;

            response.render("addVacation", {
                ...sessionVars(request),
                firstDate: firstDate,
                midDate: midDate,
                lastDate: lastDate,
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
    vacation
        .save()
        .then(() => {
            request.session.info =
                "Your request was submitted without any problem.";
            response.redirect("/calendar");
        })
        .catch((error) => {
            request.session.info =
                error.message ||
                "There was an error trying to sumbit your request.";
            response.redirect("/vacation/add");
        });
};

exports.getCheckVacation = (request, response, next) => {
    const vacationID = request.params.vacationID; // Obtener el ID de la vacación desde la URL
    const userID = request.session.userID;

    Vacation.fetchAllVacation(userID)
        .then(([rows]) => {
            const selectedVacation = rows.find(
                (vacation) => vacation.vacationID == vacationID
            );

            if (!selectedVacation) {
                return response
                    .status(404)
                    .send("Solicitud de vacaciones no encontrada.");
            }

            response.render("checkVacation", {
                ...sessionVars(request),
                vacation: selectedVacation,
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send("Error al obtener los datos.");
        });
};

exports.getModifyVacation = async (request, response, next) => {
    try {
        const vacationID = request.params.vacationID;
        const userID = request.session.userID;

        console.log("vacation id", vacationID);
        // Si existe un método más eficiente, como fetchById, sería mejor usarlo
        const [rows] = await Vacation.fetchAllVacation(userID);
        const selectedVacation = rows.find(
            (vacation) => String(vacation.vacationID).trim() === vacationID.trim()
        );
        

        if (!selectedVacation) {
            return response.status(404).send("Vacación no encontrada.");
        }

        response.render("modifyVacation", {
            ...sessionVars(request),
            vacation: selectedVacation,
        });
    } catch (error) {
        console.error("Error al obtener la vacación:", error);
        response.status(500).send("Error interno del servidor.");
    }
};



exports.updateVacation  = (request, response, next) => {
    console.log("Entrando en updateVacation..."); // <-- Debug
    console.log("Datos recibidos:", request.body); // <-- Debug
    const vacationId = request.params.vacationID;
    const { startDate, endDate, reason } = request.body;

    console.log("vacationId recibido en postUpdateVacation:", request.params.vacationID);
    console.log("vacationId recibido:", vacationId);

    if (!startDate || !endDate || !reason) {
        return response.status(400).json({
            success: false,
            message: "Todos los campos son obligatorios.",
        });
    }
    Vacation.updateVacation(vacationId, startDate, endDate, reason)
    .then(() => {
            response.status(200).json({
                success: true,
                message: "Solicitud de vacaciones actualizada exitosamente.",
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({
                success: false,
                message: "Error al actualizar la solicitud.",
            });
        });
};


exports.postRequestApprove = (request, response, next) => {
    const vacationId = request.params.vacationID;
    const userRole = request.session.role;
    const userId = request.session.userID;

    // Verificar si el usuario tiene permiso para aprobar esta solicitud
    Vacation.fetchOneVacation(vacationId)
        .then(([rows]) => {
            if (rows.length === 0) {
                return response.status(404).json({
                    success: false,
                    message: "Solicitud no encontrada"
                });
            }

            const vacation = rows[0];
            
            // Si es RRHH, actualiza el estado de RRHH sin importar el estado del líder
            if (userRole === "Human Resources") {
                // Elimina la restricción de verificar el estado del líder
                return Vacation.updateStatusHR(vacationId, 1); // 1 = Aprobado
            }
            // Si es líder, actualiza el estado del líder
            else if (userRole === "Leader") {
                return Vacation.fetchDepartmentPaginated(userId, 1, 0)
                    .then(([departmentVacations]) => {
                        const hasPermission = departmentVacations.some(v => v.vacationID === vacationId);
                        if (!hasPermission) {
                            throw new Error("No tienes permiso para aprobar esta solicitud");
                        }
                        return Vacation.updateStatusLeader(vacationId, 1);
                    });
            }
            else {
                throw new Error("Rol no autorizado");
            }
        })
        .then(() => {
            response.status(200).json({
                success: true,
                message: "Solicitud aprobada exitosamente"
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({
                success: false,
                message: error.message || "Error al procesar la solicitud"
            });
        });
};

exports.postRequestDeny = (request, response, next) => {
    const vacationId = request.params.vacationID;
    const userRole = request.session.role;
    const userId = request.session.userID;

    // Verificar si el usuario tiene permiso para denegar esta solicitud
    Vacation.fetchOneVacation(vacationId)
        .then(([rows]) => {
            if (rows.length === 0) {
                return response.status(404).json({
                    success: false,
                    message: "Solicitud no encontrada"
                });
            }

            const vacation = rows[0];
            
            // Si es RRHH, actualiza el estado de RRHH sin importar el estado del líder
            if (userRole === "Human Resources") {
                // Elimina la restricción de verificar el estado del líder
                return Vacation.updateStatusHR(vacationId, 0); // 0 = Denegado
            }
            // Si es líder, actualiza el estado del líder
            else if (userRole === "Department Leader") {
                return Vacation.fetchDepartmentPaginated(userId, 1, 0)
                    .then(([departmentVacations]) => {
                        const hasPermission = departmentVacations.some(v => v.vacationID === vacationId);
                        if (!hasPermission) {
                            throw new Error("No tienes permiso para denegar esta solicitud");
                        }
                        return Vacation.updateStatusLeader(vacationId, 0);
                    });
            }
            else {
                throw new Error("Rol no autorizado");
            }
        })
        .then(() => {
            response.status(200).json({
                success: true,
                message: "Solicitud denegada exitosamente"
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({
                success: false,
                message: error.message || "Error al procesar la solicitud"
            });
        });
};

exports.getRoot = (request, response, next) => {
    const userID = request.session.userID;
    // const userRole = request.session.role;
    // console.log("userRole", userRole);
    Vacation.fetchAllVacation(userID)
        .then(([rows]) => {
            // Vacaciones aprobadas: ambas aprobadas (valor 1)
            const approvedVacations = rows.filter(
                (vacation) =>
                    vacation.leaderStatus === 1 && vacation.hrStatus === 1
            );

            // Vacaciones pendientes: si alguno está pendiente (valor 2)
            const pendingVacations = rows.filter(
                (vacation) =>
                    vacation.leaderStatus === 2 || vacation.hrStatus === 2
            );

            response.render("ownVacation", {
                ...sessionVars(request),
                approvedVacations,
                pendingVacations,
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send("Error al obtener los datos.");
        });
};