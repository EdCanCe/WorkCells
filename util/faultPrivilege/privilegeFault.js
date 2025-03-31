module.exports = (request, response, next) => {
    for (let privilegio of request.session.privilegios) {
        if (privilegio.title == "Superadmin elimina falta administrativa") {
            return next();
        }
        if (privilegio.title == "Superadmin modifica falta administrativa") {
            return next();
        }
        if (privilegio.title == "Superadmin registra falta administrativa") {
            return next();
        }
    }
    return response
        .status(403)
        .send("Tus acciones han sido registradas y reportadas al superadmin");
};
