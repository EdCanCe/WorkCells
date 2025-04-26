const Employee = require("../models/employee.model");
const sessionVars = require("../util/sessionVars");

/**
 * Abre el perfil del usuario
 * 
 * @param {*} request       Request de la petición
 * @param {*} response      Response de la petición
 * @param string userID     El ID del usuario a abirle el perfil
 * @param bool isOwn        El usuario es dueño de ese perfil
 */
module.exports = (request, response, userID, isOwn) => {
    // Obtiene los datos del usuario
    Employee.fetchAllDataUser(userID)
        .then(([rows]) => {
            // Manda a renderizar el perfil del usuario
            response.render("employeeProfile", {
                ...sessionVars(request, 'Profile'),
                isOwn,
                userData: rows[0],
                API: process.env.GEOLOCATION_API_KEY,
            });
        })
        .catch((error) => {
            request.session.alert = "User not found";
            response.redirect("/error");
        });
}