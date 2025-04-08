const Fault = require("../models/faults.model");
const FaultMedia = require("../models/faultsMedia.model");
const sessionVars = require('../util/sessionVars');

exports.getAdd = (request, response, next) => {
    response.render("faultsAdd", {
        ...sessionVars(request),
    });
};

exports.postAdd = (request, response, next) => {
    console.log(request.body); // Verifica que los datos lleguen correctamente

        if (!request.body.reason || !request.body.doneDate || !request.body.email) {
            // Validación de valores en el cuerpo de la solicitud
            return response.redirect("/error"); // Redirigir a una página de error si faltan datos
        }

    // Crear un nuevo objeto Fault
    const faults = new Fault({
        reason: request.body.reason,
        doneDate: request.body.doneDate,
        email: request.body.email
    }
    );

    console.log("email: ", request.body.email);
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

exports.getSearch = async (request, response) => {
    const page = parseInt(request.query.page) || 1;
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

    try {
        const [rows] = await searchPromise;
        response.json({ faults: rows, page, query });
      } catch (error) {
        console.error("Error al obtener las faltas:", error);
        response.status(500).json({ error: "Error al obtener las faltas" });
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
  

  
