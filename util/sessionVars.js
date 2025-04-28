/**
 * Regresa las variables necesarias de la sesión.
 * Así como su rol, la posición de la nav, datos de información y warning.
 * 
 * @param {*} request 
 * @param string title      El títlo de la página 
 * @param string userManualAdress       El enlace al manual de usuario para esa página.
 * @returns 
 */
module.exports = (request, title = '', userManualAdress = '') => {
    // Obtiene un popup de alerta, lo guarda y lo resetea
    const alert = request.session.alert || "";
    if (request.session.alert) request.session.alert = "";

    // Obtiene un popup de warning, lo guarda y lo resetea
    const warning = request.session.warning || "";
    if (request.session.warning) request.session.warning = "";

    // Obtiene un popup de info, lo guarda y lo resetea
    const info = request.session.info || "";
    if (request.session.info) request.session.info = "";

    return {
        alert,
        warning,
        info,
        title,
        userManualAdress,
        csrfToken: request.csrfToken(),
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || "",
        userID: request.session.userID || 0,
        role: request.session.role || "none",
        privilegios: request.session.privilegios || [],
        navIsOpen: request.cookies.navOpened === "0" ? false : true,
        passwdFlag: request.session.passwdFlag,
    };
};