const { error } = require("console");
const Holiday = require("../models/holiday.model");
const sessionVars = require('../util/sessionVars');

exports.getHolidays = (request, response, next) => {
    response.render("holiday", {
        ...sessionVars(request),
    });
};

exports.getHolidaysAdd = (request, response, next) => {
    Holiday.fetchAll().then(([rows]) => {
        response.render("holidayAdd", {
            ...sessionVars(request),
            holidays: rows,
        });
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
            request.session.info = error.message || "Error al registrar dia feriado.";
            response.redirect("/holiday/add");
        });
};

exports.getHoliday = (request, response, next) => {
    response.render("holidayCheck", {
        ...sessionVars(request),
    });
};

exports.getUsedHoliday = (request, response, next) => {
    Holiday.fetchUsedHoliday()
        .then(([rows, fieldData]) => {
            response.render("usedHoliday", {
                ...sessionVars(request),
                holidays: rows, // Cambio aquí por claridad semántica
            });
        })
        .catch((error) => {
            console.error(error); // Mejor manejo de error
            response.status(500).send("Error al obtener los días feriados.");
        });
};

exports.listPaginated = async (request, response) => {
    const page = parseInt(request.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const [rows] = await Holiday.getHolidayPaginated(limit, offset); // <== AQUÍ EL CAMBIO
        response.json(rows);
    } catch (err) {
        console.error(err);
        response.status(500).json({ error: "Error al obtener los días registrados." });
    }
};

exports.getHolidayModify = (request, response, next) => {
    response.render("holidayModify", {
        ...sessionVars(request),
    });
};
