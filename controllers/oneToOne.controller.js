const { response } = require("express");
const OneToOne = require("../models/oneToOne.model");
const Question = require("../models/question.model");
const Measurable = require("../models/measurable.model");
const Answer = require("../models/answer.model");
const Measure = require("../models/measure.model");
const { formatDateWithOrdinal } = require("../util/formatDate");
const sessionVars = require('../util/sessionVars');

exports.getOneToOne = (req, res, next) => {
    res.render("oneToOne", {
        ...sessionVars(req),
    });
};

exports.getOneToOneSchedule = (req, res, next) => {
    res.render("oneToOneAdd", {
        ...sessionVars(req),
    });
};

exports.postOneToOneSchedule = (req, res, next) => {
    OneToOne.getID(req.body.email)
        .then(([rows]) => {
            if (rows.length === 0) {
                req.session.error =
                    "El correo ingresado no se encuentra registrado.";
                return res.redirect("/oneToOne/schedule");
            }
            // Si el usuario está registrado, se obtiene su ID
            const oneOnOneUserIDFK = rows[0].userID;
            const meetingDate = req.body.date + " " + req.body.time + ":00";

            const meeting = new OneToOne(
                req.body.expectedTime,
                meetingDate,
                req.body.meetingLink,
                oneOnOneUserIDFK
            );

            return meeting.save().then(() => {
                req.session.info = `Sesión de one to one para el ${meetingDate} con ${req.body.name} creada`;
                res.redirect("/oneToOne/schedule");
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error interno del servidor");
        });
};

exports.getOneToOneFill = (req, res, next) => {
    OneToOne.fetchBySession(req.params.sessionID)
        .then(([rows]) => {
            if (rows.length === 0) {
                req.session.info = "There is no session with that ID.";
                res.status(404).redirect("/notFound");
            }
            Question.fetchAll().then(([questions]) => {
                Measurable.fetchAll().then(([measurables]) => {
                    res.render("oneToOneFill", {
                        ...sessionVars(req),
                        name: rows[0].birthName + " " + rows[0].surname,
                        meetingDate: formatDateWithOrdinal(rows[0].meetingDate),
                        meetingLink: rows[0].meetingLink,
                        questions: questions,
                        measurables: measurables,
                        sessionID: req.params.sessionID,
                    });
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postOneToOneFill = (req, res, next) => {
    OneToOne.countVariables()
        .then(([rows]) => {
            const questionsNum = rows[0].questionAmount;
            const measurableAmount = rows[0].measurableAmount;
            for (let i = 1; i <= questionsNum; i++) {
                const answer = new Answer(
                    req.body[`question_${i}`],
                    req.params.sessionID,
                    req.body[`question_id_${i}`]
                );
                console.log("RSPUESTA: ");
                console.log(req.body[`question_${i}`]);
                answer.save();
            }
            for (let i = 1; i <= measurableAmount; i++) {
                const measure = new Measure(
                    req.body[`measure_${i}`],
                    req.params.sessionID,
                    req.body[`measurable_id_${i}`]
                );
                measure.save();
            }
            res.redirect(`/oneToOne/${req.params.sessionID}`);
        })
        .catch((err) => {
            console.log(err);
            req.session.info =
                err.message || "There was an error trying to sumbit it.";
            res.redirect(`/oneToOne/${req.params.sessionID}/fill`);
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

exports.getOneToOneGraphs = (req, res, next) => {
    res.render("oneToOneGraphs", {
        ...sessionVars(req),
    });
};

exports.getOneToOneCheck = (req, res, next) => {
    res.render("oneToOneCheck", {
        ...sessionVars(req),
    });
};

exports.getFullName = (req, res, next) => {
    OneToOne.getFullName(req.params.email)
        .then(([rows]) => {
            if (rows.length > 0) {
                res.json({
                    success: true,
                    birthName: rows[0].birthName,
                    surname: rows[0].surname,
                });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, error: err.message });
        });
};
