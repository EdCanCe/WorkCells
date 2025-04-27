const OneToOne = require("../models/oneToOne.model");
const Question = require("../models/question.model");
const Measurable = require("../models/measurable.model");
const Answer = require("../models/answer.model");
const Measure = require("../models/measure.model");
const formatDate = require("../util/formatDate");
const sessionVars = require("../util/sessionVars");
const title = "One To One";

exports.getOneToOne = (request, response, next) => {
    const role = request.session.role;

    if (role === "Colaborator" || role === "Department Leader") {
        const userID = request.session.userID
        OneToOne.getOwnSessions(userID)
            .then(([rows, fieldData]) => {
                response.render("oneToOneCheckAll", {
                    ...sessionVars(request, title),
                    sessions: rows,
                    role: role,
                });
            })
            .catch((err) => {
                console.error(
                    "Error en la promesa de usuarios y sesiones ",
                    err
                );
            });
    }
    // superadmin
    else {
        OneToOne.getAllSessions()
            .then(([rows, fieldData]) => {
                response.render("oneToOneCheckAll", {
                    ...sessionVars(request, title),
                    sessions: rows,
                    role: role,
                });
            })
            .catch((err) => {
                console.error(
                    "Error en la promesa de usuarios y sesiones ",
                    err
                );
            });
    }
};

exports.getOneToOneSchedule = (request, response, next) => {
    response.render("oneToOneAdd", {
        ...sessionVars(request, title),
    });
};

exports.postOneToOneSchedule = (request, response, next) => {
    OneToOne.getID(request.body.email)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.alert =
                    "El correo ingresado no se encuentra registrado.";
                return response.redirect("/oneToOne/schedule");
            }
            // Si el usuario está registrado, se obtiene su ID
            const oneOnOneUserIDFK = rows[0].userID;
            const meetingDate = `${request.body.date} ${request.body.time}:00`;

            const meeting = new OneToOne(
                request.body.expectedTime,
                meetingDate,
                request.body.meetingLink,
                oneOnOneUserIDFK
            );

            return meeting.save().then(() => {
                request.session.info = `Sesión de one to one para el ${meetingDate} con ${request.body.name} creada`;
                response.redirect("/oneToOne");
            });
        })
        .catch((err) => {
            console.error(err);
            response.status(500).send("Error interno del servidor");
        });
};

exports.getOneToOneFill = (request, response, next) => {
    // Obtiene los valores de la sesión
    OneToOne.fetchBySession(request.params.sessionID)
        .then(([rows]) => {
            // En caso de que no exista, redirige a error
            if (rows.length === 0) {
                request.session.alert = "There is no session with that ID.";
                response.status(404).redirect("/notFound");
            }

            // Consulta las preguntas en la base de datos
            Question.fetchAll().then(([questions]) => {
                // Consulta las métricas en la base de datos
                Measurable.fetchAll().then(([measurables]) => {
                    // Renderiza el formulario para llenar los datos
                    response.render("oneToOneFill", {
                        ...sessionVars(request, title),
                        questions,
                        measurables,
                        name: `${rows[0].birthName} ${rows[0].surname}`,
                        meetingDate: formatDate.withOrdinal(
                            rows[0].meetingDate
                        ),
                        meetingLink: rows[0].meetingLink,
                        sessionID: request.params.sessionID,
                    });
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postOneToOneFill = (request, response, next) => {
    // Obtiene la cantidad de preguntas y métricas
    const questionsNum = request.body.numQuestions;
    const measurableAmount = request.body.numMeasures;

    // Añade cada pregunta a la base de datos
    for (let i = 1; i <= questionsNum; i++) {
        const answer = new Answer(
            request.body[`question${i}`],
            request.params.sessionID,
            request.body[`questionID${i}`]
        );
        answer.save();
    }

    // Añade cada métrica a la base de datos
    for (let i = 1; i <= measurableAmount; i++) {
        const measure = new Measure(
            request.body[`measure${i}`],
            request.params.sessionID,
            request.body[`measurableID${i}`]
        );
        measure.save();
    }

    // Redirección para ver la sesión
    response.redirect(`/oneToOne/${request.params.sessionID}`);
};

exports.getOneToOneCheck = (request, response, next) => {
    // Obtiene los valores de la sesión
    OneToOne.fetchBySession(request.params.sessionID)
        .then(([rows]) => {
            // En caso de que no exista, redirige a error
            if (rows.length === 0) {
                request.session.alert = "There is no session with that ID.";
                response.status(404).redirect("/notFound");
            }

            // Si no es RH y tampoco es a quien entrevistaron, no lo deja entrar
            if (
                request.session.role != "Human Resources" &&
                rows[0].oneOnOneUserIDFK != request.session.userID
            ) {
                request.session.alert =
                    "You have no permission to view this session.";
                response.status(404).redirect("/notFound");
            }

            Question.fetchBySessionData(request.params.sessionID).then(
                ([answers]) => {
                    // En caso de que no haya respuestas, indica que no está llenado
                    if (answers.length === 0) {
                        response.render("oneToOneCheck", {
                            ...sessionVars(request, title),
                            isFilled: "0",
                            sessionData: rows[0],
                            sessionID: request.params.sessionID,
                        });
                    } else {
                        // A partir de aquí significa que si se llenó la sesión
                        Measurable.fetchBySessionData(
                            request.params.sessionID
                        ).then(([measures]) => {
                            console.log(rows[0]);
                            console.log(answers[0]);
                            console.log[measures[0]];
                            response.render("oneToOneCheck", {
                                ...sessionVars(request, title),
                                answers,
                                measures,
                                isFilled: "1",
                                sessionData: rows[0],
                                sessionID: request.params.sessionID,
                                name: `${rows[0].birthName} ${rows[0].surname}`,
                                meetingDate: formatDate.withOrdinal(
                                    rows[0].meetingDate
                                ),
                            });
                        });
                    }
                }
            );
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getFullName = (request, response, next) => {
    OneToOne.getFullName(request.params.email)
        .then(([rows]) => {
            if (rows.length > 0) {
                response.json({
                    success: true,
                    birthName: rows[0].birthName,
                    surname: rows[0].surname,
                });
            } else {
                response.json({ success: false });
            }
        })
        .catch((err) => {
            console.error(err);
            response.status(500).json({
                success: false,
                error: err.message,
            });
        });
};

exports.getSearchAll = (request, response, next) => {
    const page = parseInt(request.query.page) || 1;
    const query = request.query.query || "";
    const limit = 6;
    const offset = (page - 1) * limit;

    const searchPromise = query
        ? OneToOne.searchByName(query)
        : OneToOne.getAllSessionsPaginated(limit, offset);

    searchPromise
        .then(([rows]) => {
            response.json({ rows, page, query });
        })
        .catch((error) => {
            console.error("Error en la búsqueda/paginación:", error);
            response
                .status(500)
                .json({ error: "Error en la búsqueda/paginación" });
        });
};

exports.getSearchOwn = (request, response, next) => {
    const userID = sessionVars(request).userID;
    const page = parseInt(request.query.page) || 1;
    const query = request.query.query || "";
    const limit = 6;
    const offset = (page - 1) * limit;

    const searchPromise = query
        ? OneToOne.searchByID(query, userID)
        : OneToOne.getOwnSessionsPaginated(userID, limit, offset);

    searchPromise
        .then(([rows]) => {
            response.json({ rows, page, query });
        })
        .catch((error) => {
            console.error("Error en la búsqueda/paginación:", error);
            response
                .status(500)
                .json({ error: "Error en la búsqueda/paginación" });
        });
};
