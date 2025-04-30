const path = require("path");
const fs = require("fs");
const sessionVars = require("./sessionVars");

/**
 * Renderiza un archivo
 * 
 * @param {*} request   La request de la página
 * @param {*} response  La response de la página
 */
module.exports = (request, response, isManual = false) => {
    // Obtiene el archivo a visualizar
    const fileName = request.params.mediaLink;

    // Obtiene la dirección del archivo
    const directory = path.join(__dirname, "..", isManual ? "docs" : "uploads");

    // Obtiene el archivo
    const file = path.join(directory, fileName);

    // Manda a renderizar el archivo
    fs.access(file, fs.constants.F_OK, (error) => {
        // En caso de que no se encuentre el archivo manda error
        if (error) {
            request.session.alert = 'The file wasn\'t found';
            return response.status(404).render("notFound", {
                ...sessionVars(request),
            });
        }

        // Renderiza el archivo
        response.sendFile(file);
    });
}