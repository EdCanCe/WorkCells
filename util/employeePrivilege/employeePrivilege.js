module.exports = (request, response, next) => {
    for (let privilegio of request.session.privilegios) {
        if (privilegio.title == "Superadmin consulta empleados") {
            return next();
        }
        if (privilegio.title == "Superadmin modifica datos de empleado") {
            return next();
        }
        if (privilegio.title == "Superadmin registra alta de empleado") {
            return next();
        }
        if (privilegio.title == "Superadmin registra baja de empleado") {
            return next();
        }
    }
    return response
        .status(403)
        .send("Tus acciones han sido registradas y reportadas al superadmin");
};
