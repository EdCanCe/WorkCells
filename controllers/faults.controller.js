const Fault = require("../models/faults.model");
const FaultMedia = require("../models/faultsMedia.model");
const sessionVars = require("../util/sessionVars");
const title = 'Faults';
const pdfName = "fault";

exports.getAdd = (request, response, next) => {
    response.render("faultsAdd", {
        ...sessionVars(request, title, pdfName),
    });
};

exports.postAdd = (request, response, next) => {
    if (!request.body.reason || !request.body.doneDate || !request.body.email) {
        // Validación de valores en el cuerpo de la solicitud
        return response.redirect("/error"); // Redirigir a una página de error si faltan datos
    }

    // Crear un nuevo objeto Fault
    const faults = new Fault({
        reason: request.body.reason,
        doneDate: request.body.doneDate,
        email: request.body.email,
    });

    faults
        .save()
        .then((faultID) => {
            request.session.info = `Fault of ${faults.email} in the date ${faults.doneDate} created`;

            if (request.file) {
                const media = new FaultMedia(request.file.filename, faultID);
                return media.save();
            }
            return Promise.resolve();
        })
        .then(() => {
            response.redirect("/fault");
        })
        .catch((error) => {
            console.error(error);
            request.session.warning = `Error al ingresar datos.`;
            response.redirect("/fault");
            response.status(500);
        });
};

exports.getCheck = (request, response, next) => {
    Fault.fetchByID(request.params.faultID).then(([rows]) => {
        response.render("checkFault", {
            ...sessionVars(request, title, pdfName),
            fault: rows[0],
        });
    });
};

exports.getRoot = (request, response, next) => {
    Fault.fetchAll()
        .then(([rows, fieldData]) => {
            response.render("faults", {
                ...sessionVars(request, title, pdfName),
                fault: rows,
            });
        })
        .catch((error) => {
            console.error(error); // Mejor manejo de error
            response.status(500).send("Error al obtener los datos.");
        });
};

exports.getSearch = (request, response) => {
    const page = parseInt(request.query.page, 10) || 1;
    const query = request.query.query || "";
    const limit = 6;
    const offset = (page - 1) * limit;

    let searchPromise;
    if (query) {
        // Si se proporciona una consulta, se usa el método de búsqueda
        searchPromise = Fault.searchByQuery(query, limit, offset);
    } else {
        // Si no hay búsqueda, se usa la paginación estándar
        searchPromise = Fault.getFaltasPaginated(limit, offset);
    }

    searchPromise
        .then(([rows]) => {
            response.json({ faults: rows, page, query });
        })
        .catch((error) => {
            console.error("Error al obtener las faltas:", error);
            response.status(500).json({ error: "Error al obtener las faltas" });
        });
};

exports.postDelete = (request, response, next) => {
    const fault = new Fault({
        faultID: request.body.faultID,
        userID: request.body.userID,
    });

    fault.delete()
        .then(() => {
            response.status(200).json({ success: true });
        })
        .catch((error) => {
            response.status(200).json({ success: false });
        });
};

// controllers/faults.controller.js
exports.UpdateFault = (req, res, next) => {
    const faultID = req.params.faultID;
    const reason = req.body.reason;
    const doneDate = req.body.doneDate;

    if (!reason || !doneDate) {
        return res.redirect("/error");
    }

    // IMPORTANTE: retornamos la promesa para encadenar correctamente
    return Fault.updateFault({ faultID, reason, doneDate })
        .then((updatedID) => {
            req.session.info = `Fault ${updatedID} updated correctly.`;

            if (req.file) {
                // limpiar medias anteriores y guardar la nueva
                return FaultMedia.clear(faultID).then(() => {
                    const media = new FaultMedia(req.file.filename, updatedID);
                    return media.save();
                });
            }

            // si no hay archivo, devolvemos una promesa ya resuelta
            return Promise.resolve();
        })
        .then(() => {
            // este redirect ya espera a que termine clear() + save()
            res.redirect("/fault");
        })
        .catch((err) => {
            console.error(err);
            req.session.warning = "Error al actualizar datos.";
            res.status(500).redirect("/fault");
        });
};
