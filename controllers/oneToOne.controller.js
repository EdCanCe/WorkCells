const { response } = require("express");
const OneToOne = require("../models/oneToOne.model");
const Question = require("../models/question.model");
const Measurable = require("../models/measurable.model");
const Answer = require("../models/answer.model");
const Measure = require("../models/measure.model");
const { formatDateWithOrdinal } = require("../util/formatDate");
const sessionVars = require('../util/sessionVars');

exports.getOneToOne = (request, response, next) => {
    response.render("oneToOne", {
        ...sessionVars(request),
    });
};

exports.getOneToOneSchedule = (request, response, next) => {
    response.render("oneToOneAdd", {
        ...sessionVars(request),
    });
};

exports.postOneToOneSchedule = (request, response, next) => {
    OneToOne.getID(request.body.email)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.error =
                    "El correo ingresado no se encuentra registrado.";
                return response.redirect("/oneToOne/schedule");
            }
            // Si el usuario está registrado, se obtiene su ID
            const oneOnOneUserIDFK = rows[0].userID;
            const meetingDate = request.body.date + " " + request.body.time + ":00";

            const meeting = new OneToOne(
                request.body.expectedTime,
                meetingDate,
                request.body.meetingLink,
                oneOnOneUserIDFK
            );

            return meeting.save().then(() => {
                request.session.info = `Sesión de one to one para el ${meetingDate} con ${request.body.name} creada`;
                response.redirect("/oneToOne/schedule");
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
                request.session.alert = "There is no session with that ID."
                response.status(404).redirect("/notFound");
            }

            // Consulta las preguntas en la base de datos
            Question.fetchAll().then(([questions]) => {
                // Consulta las métricas en la base de datos
                Measurable.fetchAll().then(([measurables]) => {
                    // Renderiza el formulario para llenar los datos
                    response.render("oneToOneFill", {
                        ...sessionVars(request),
                        name: rows[0].birthName + " " + rows[0].surname,
                        meetingDate: formatDateWithOrdinal(rows[0].meetingDate),
                        meetingLink: rows[0].meetingLink,
                        questions: questions,
                        measurables: measurables,
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

    OneToOne.countVariables()
        .then(([rows]) => {
            const questionsNum = request.body.numQuestions;
            const measurableAmount = request.body.numMeasures;
            for (let i = 1; i <= questionsNum; i++) {
                const answer = new Answer(
                    request.body[`question_${i}`],
                    request.params.sessionID,
                    request.body[`question_id_${i}`]
                );
                console.log("RSPUESTA: ");
                console.log(request.body[`question_${i}`]);
                answer.save();
            }
            for (let i = 1; i <= measurableAmount; i++) {
                const measure = new Measure(
                    request.body[`measure_${i}`],
                    request.params.sessionID,
                    request.body[`measurable_id_${i}`]
                );
                measure.save();
            }
            response.redirect(`/oneToOne/${request.params.sessionID}`);
        })
        .catch((err) => {
            console.log(err);
            request.session.info =
                err.message || "There was an error trying to sumbit it.";
            response.redirect(`/oneToOne/${request.params.sessionID}/fill`);
        });
};

/** Probar queries
 * 
SELECT question, answer
from oneOnOne o, oneOnOneQuestion oq, oneOnOneAnswer a
WHERE a.answerOneOnOneIDFK = o.oneOnOneID
AND a.questionIDFK = oq.questionID
AND o.oneOnOneID = '0301111b-9bfc-43d0-8d73-098f03b3a583';

SELECT DISTINCT evaluation, summary
from oneOnOne o, oneOnOneMeasure m, oneOnOneMeasurable ml
WHERE m.measureOneOnOneIDFK = o.oneOnOneID
AND ml.measurableID = m.measurableIDFK
AND o.oneOnOneID = '0301111b-9bfc-43d0-8d73-098f03b3a583';
 */

exports.getOneToOneGraphs = (request, response, next) => {
    response.render("oneToOneGraphs", {
        ...sessionVars(request),
    });
};

exports.getOneToOneCheck = (request, response, next) => {
    response.render("oneToOneCheck", {
        ...sessionVars(request),
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
            response.status(500).json({ success: false, error: err.message });
        });
};
