const Vacation = require("../models/vacation.model");
const User = require("../models/user.model");

exports.getRequests = (request, response, next) => {
    const employeedId = request.session.userID;
    console.log(employeedId);
    const esSuperAdmin = request.session.privilegios.some((p) =>
        p.title.includes("Superadmin")
    );

    console.log("privilegios: ", request.session.privilegios);
    console.log("Tipo de privilegios:", typeof request.session.privilegios);
    console.log("Valor de privilegios:", request.session.privilegios);
    console.log(esSuperAdmin);
    // Verificar si es superAdmin

    const mensaje = request.session.info || "";
    request.session.info = ""; // Limpiar la sesión después de usar el mensaje

    let fetchPromise;

    if (esSuperAdmin) {
        fetchPromise = Vacation.fetchAllSuperAdmin();
    } else {
        fetchPromise = Vacation.fetchAllWithNames(employeedId);
    }
    fetchPromise
        .then(([rows]) => {
            response.render("vacationRequests", {
                isLoggedIn: request.session.isLoggedIn || false,
                username: request.session.username || "",
                csrfToken: request.csrfToken(),
                vacations: rows, // Pasar la lista filtrada de vacaciones
                info: mensaje,
                privilegios: request.session.privilegios || [],
            });
        })
        .catch((error) => {
            console.error(error);
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
                isLoggedIn: request.session.isLoggedIn || false,
                userID: request.session.userID || 0,
                firstDate: firstDate,
                midDate: midDate,
                lastDate: lastDate,
                info: mensaje,
                csrfToken: request.csrfToken(),
                privilegios: request.session.privilegios || [],
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
                isLoggedIn: request.session.isLoggedIn || false,
                username: request.session.username || "",
                vacation: selectedVacation,
                info: "",
                privilegios: request.session.privilegios || [],
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
            (vacation) => vacation.vacationID === vacationID
        );

        if (!selectedVacation) {
            return response.status(404).send("Vacación no encontrada.");
        }

        response.render("modifyVacation", {
            isLoggedIn: request.session.isLoggedIn || false,
            username: request.session.username || "",
            vacation: selectedVacation,
            info: "",
            privilegios: request.session.privilegios || [],
        });
    } catch (error) {
        console.error("Error al obtener la vacación:", error);
        response.status(500).send("Error interno del servidor.");
    }
};
// TODO: Hacer que, dependiendo si es lider o hr, se actualice el status de la solicitud

exports.postRequestApprove = (request, response, next) => {
    const vacationId = request.params.vacationID;

    Vacation.updateStatusLeader(vacationId, 1) // 1 = Aprobado
        .then(() => {
            response.status(200).json({
                success: true,
                message: "Request approved",
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({
                success: false,
                message: "Error processing request",
            });
        });
};

exports.postRequestDeny = (request, response, next) => {
    const vacationId = request.params.vacationID;

    Vacation.updateStatusLeader(vacationId, 0) // 0 = Denegado
        .then(() => {
            response.status(200).json({
                success: true,
                message: "Request denied",
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({
                success: false,
                message: "Error processing request",
            });
        });
};

exports.getRoot = (request, response, next) => {
    const userID = request.session.userID;

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
                isLoggedIn: request.session.isLoggedIn || false,
                username: request.session.username || "",
                approvedVacations, // Vacaciones aprobadas
                pendingVacations, // Vacaciones pendientes
                info: "",
                privilegios: request.session.privilegios || [],
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send("Error al obtener los datos.");
        });
};
