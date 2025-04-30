const { error } = require("console");
const Holiday = require("../models/holiday.model");
const Template = require("../models/templateHoliday.model");
const sessionVars = require("../util/sessionVars");
const { response } = require("express");
const title = "Holidays";
const pdfName = "holiday";

exports.getHolidays = (request, response, next) => {
    response.render("usedHoliday", {
        ...sessionVars(request, title, pdfName),
    });
};

exports.getTemplateHoliday = (request, response, next) => {
    response.render("templateHolidayList", {
        ...sessionVars(request, title, pdfName),
    });
};

exports.getCheckTemplateHoliday = (request, response, next) => {
    const templateHolidayID = request.params.templateHolidayID;

    Template.fetchOneTemplateHoliday(templateHolidayID)
        .then(([rows]) => {
            if (rows.length === 0) {
                return response.status(404).send("Template Holiday not found.");
            }

            const holiday = rows[0];
            response.render("templateHolidayCheck", {
                ...sessionVars(request, title, pdfName),
                holiday,
                csrfToken: request.csrfToken(),
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send("Error in obtaining holiday data.");
        });
};

exports.getHolidaysAdd = (request, response, next) => {
    Holiday.fetchAll().then(([rows]) => {
        response.render("holidayAdd", {
            ...sessionVars(request, title, pdfName),
            holidays: rows,
        });
    });
};

exports.getTemplateHolidayAdd = (request, response, next) => {
    response.render("templateHolidayAdd", {
        ...sessionVars(request, title, pdfName),
    });
};

exports.postHolidaysAdd = (request, response, next) => {
    const holiday = new Holiday(
        request.body.usedDate,
        request.body.usedTemplateHolidayIDFK
    );
    console.log(request.body);
    holiday
        .save()
        .then(() => {
            request.session.info = "Dia Feriado registrado correctamente.";
            response.redirect("/holiday");
        })
        .catch((error) => {
            console.error(error);
            request.session.info =
                error.message || "Error al registrar dia feriado.";
            response.redirect("/holiday/add");
        });
};

exports.postTemplateHolidayAdd = (request, response, next) => {
    const template = new Template(request.body.holidayDate, request.body.title, pdfName);
    console.log(request.body);
    template
        .save()
        .then(() => {
            request.session.info = "Holiday registered correctly.";
            response.redirect("/holiday");
        })
        .catch((error) => {
            console.error(error);
            request.session.info =
                error.message || "Error when registering a holiday.";
            response.redirect("/holiday/add/template");
        });
};

exports.getHoliday = (request, response, next) => {
    response.render("holidayCheck", {
        ...sessionVars(request, title, pdfName),
    });
};

exports.getUsedHoliday = (request, response, next) => {
    Holiday.fetchUsedHoliday()
        .then(([rows, fieldData]) => {
            response.render("usedHoliday", {
                ...sessionVars(request, title, pdfName),
                holidays: rows,
            });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send("Error al obtener los días feriados.");
        });
};

exports.listPaginated = (request, response) => {
    const page = parseInt(request.query.page, 10) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    Holiday.getHolidayPaginated(limit, offset)
        .then(([rows]) => {
            response.json(rows);
        })
        .catch((err) => {
            console.error(err);
            response
                .status(500)
                .json({ error: "Error al obtener los días registrados." });
        });
};

exports.listTemplatePaginated = (request, response) => {
    const page = parseInt(request.query.page, 10) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    Template.getTemplateHolidayPaginated(limit, offset)
        .then(([rows]) => {
            response.json(rows);
        })
        .catch((err) => {
            console.error(err);
            response
                .status(500)
                .json({ error: "Error al obtener los días registrados." });
        });
};

exports.getHolidayModify = (request, response, next) => {
    const usedHolidayID = request.params.usedHolidayID;

    Holiday.fetchOneUsedHoliday(usedHolidayID)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.info = "Holiday not found";
                return response.redirect("/holiday");
            }

            const holiday = rows[0];
            console.log(rows);
            response.render("holidayModify", {
                ...sessionVars(request, title, pdfName),
                holiday,
            });
        })
        .catch((error) => {
            console.error(error);
            response
                .status(500)
                .send("Error al cargar el formulario de modificación.");
        });
};

exports.getTemplateHolidayModify = (request, response, next) => {
    const templateHolidayID = request.params.templateHolidayID;

    Template.fetchOneTemplateHoliday(templateHolidayID)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.info = "Holiday not found";
                return response.redirect("/holiday/template");
            }

            const holiday = rows[0];
            console.log(rows);
            response.render("templateHolidayModify", {
                ...sessionVars(request, title, pdfName),
                holiday,
            });
        })
        .catch((error) => {
            console.error(error);
            response
                .status(500)
                .send("Error al cargar el formulario de modificación.");
        });
};

exports.postTemplateHolidayModify = (request, response, next) => {
    const templateHolidayID = request.params.templateHolidayID;
    const title = request.body.title;
    const holidayDate = request.body.holidayDate;

    console.log("Datos recibidos en POST:", {
        templateHolidayID,
        holidayDate,
        title,
    });

    Template.updateDate(title, holidayDate, templateHolidayID)
        .then(() => {
            request.session.info = "Template holiday updated correctly.";
            response.redirect(`/holiday/template/check/${templateHolidayID}`);
        })
        .catch((error) => {
            console.error(error);
            request.session.info = "Error when modifying the holiday.";
            response.redirect(
                `/holiday/template/check/modify/${templateHolidayID}`
            );
        });
};

exports.postHolidayModify = (request, response, next) => {
    const usedHolidayID = request.params.usedHolidayID;
    const usedDate = request.body.usedDate;

    console.log("Datos recibidos en POST:", {
        usedHolidayID,
        usedDate,
    });

    Holiday.updateDate(usedHolidayID, usedDate)
        .then(() => {
            request.session.info =
                "Fecha del feriado actualizada correctamente.";
            response.redirect(`/holiday/check/${usedHolidayID}`);
        })
        .catch((error) => {
            console.error(error);
            request.session.info = "Error al modificar el feriado.";
            response.redirect(`/holiday/check/modify/${usedHolidayID}`);
        });
};

exports.getCheckHoliday = (request, response, next) => {
    const usedHolidayID = request.params.usedHolidayID;

    Holiday.fetchOneUsedHoliday(usedHolidayID)
        .then(([rows]) => {
            if (rows.length === 0) {
                return response.status(404).send("Feriado no encontrado.");
            }

            const holiday = rows[0];
            response.render("checkUsedHoliday", {
                ...sessionVars(request, title, pdfName),
                holiday,
                csrfToken: request.csrfToken(),
            });
        })
        .catch((error) => {
            console.error(error);
            response
                .status(500)
                .send("Error al obtener los datos del feriado.");
        });
};

exports.postHolidayDelete = (request, response, next) => {
    const usedHolidayID = request.params.usedHolidayID;

    Holiday.deleteUsedHoliday(usedHolidayID)
        .then(() => {
            response.status(200).json({ success: true });
        })
        .catch((error) => {
            console.error("Error al eliminar el feriado:", error.message);
            response.status(500).json({ success: false, error: error.message });
        });
};

exports.postTemplateHolidayDelete = (request, response, next) => {
    const templateHolidayID = request.params.templateHolidayID;

    Template.deleteTemplateHoliday(templateHolidayID)
        .then(() => {
            response.status(200).json({ success: true });
        })
        .catch((error) => {
            console.error("Error in eliminating the holiday:", error.message);
            response.status(500).json({ success: false, error: error.message });
        });
};
