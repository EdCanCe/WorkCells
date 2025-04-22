const { error } = require("console");
const Holiday = require("../models/holiday.model");
const sessionVars = require("../util/sessionVars");
const { response } = require("express");

exports.getHolidays = (request, response, next) => {
    response.render("usedHoliday", {
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
            request.session.info =
                error.message || "Error al registrar dia feriado.";
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
    const limit = 10;
    const offset = (page - 1) * limit;
  
    Holiday.getHolidayPaginated(limit, offset)
      .then(([rows]) => {
        response.json(rows);
      })
      .catch(err => {
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
                ...sessionVars(request),
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
                ...sessionVars(request),
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
