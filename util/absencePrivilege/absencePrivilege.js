module.exports = (request, response, next) => {
    for (let privilegio of request.session.privilegios) {
        if (
            privilegio.title ==
            "Superadmin registra respuesta hacia ausencia de empleado"
        ) {
            return next();
        }
        if (
            privilegio.title ==
            "Líder registra respuesta hacia ausencia de colaborador"
        ) {
            return next();
        }
        if (privilegio.title == "Líder consulta ausencias de colaborador") {
            return next();
        }
        if (privilegio.title == "Superadmin consulta ausencias de empleado") {
            return next();
        }
    }
    return response
        .status(403)
        .send("Tus acciones han sido registradas y reportadas al superadmin");
};
