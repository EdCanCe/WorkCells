const Fault = require("../models/faults.model");
const FaultMedia = require("../models/faultsMedia.model");
const sessionVars = require('../util/sessionVars');

exports.getAdd = (request, response, next) => {
    response.render("faultsAdd", {
        ...sessionVars(request),
    });
};

exports.postAdd = (request, response, next) => {
    console.log(request.file);
    console.log(request.body); // Verifica que los datos lleguen correctamente

    if (request.file != ".pdf" || request.file != "jpng" || request.file != "")
        if (!request.body.reason || !request.body.doneDate || !request.body.email) {
            // Validación de valores en el cuerpo de la solicitud
            return response.redirect("/error"); // Redirigir a una página de error si faltan datos
        }

    // Crear un nuevo objeto Fault
    const faults = new Fault(
        request.body.reason,
        request.body.doneDate,
        request.body.email
    );

    faults
        .save()
        .then((faultID) => {
            request.session.info = `Fault of ${faults.email} created`;

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
            request.session.info = `Error al ingresar datos.`;
            response.redirect("/fault");
            response.status(500);
        });
};

exports.getCheck = (request, response, next) => {
    response.render("check_fault", {
        ...sessionVars(request),
    });
};

exports.getRoot = (request, response, next) => {
    Fault.fetchAll()
        .then(([rows, fieldData]) => {
            response.render("faults", {
                ...sessionVars(request),
                fault: rows,
            });
        })
        .catch((error) => {
            console.error(error); // Mejor manejo de error
            response.status(500).send("Error al obtener los datos.");
        });
};

exports.listPaginated = async (request, response) => {
    const page = parseInt(request.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const [rows] = await Fault.getFaltasPaginated(limit, offset); // <== AQUÍ EL CAMBIO
        response.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las faltas" });
    }
};

exports.postDelete = (request, response, next) => {
    const fault = new Fault({
        faultID: request.body.faultID,
        userID: request.body.userID,
    });

    fault.delete()
        .then(() => {
            request.session.info = 'It was deleted successfully';
            response.redirect('/fault');
        })
        .catch((error) => {
            request.session.alert = error.message;
            response.redirect('/fault');
        })
};