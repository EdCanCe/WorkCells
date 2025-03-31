module.exports = (request, response, next) => {
    for (let privilegio of request.session.privilegios) {
        if (privilegio.nombre == "Superadmin elimina falta administrativa") {
            return next();
        }
        if (privilegio.nombre == "Superadmin modifica falta administrativa") {
            return next();
        }
        if (privilegio.nombre == "Superadmin registra falta administrativa") {
            return next();
        }
    }
    return response
        .status(403)
        .send("Tus acciones han sido registradas y reportadas al superadmin");
};
