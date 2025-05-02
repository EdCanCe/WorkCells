module.exports = (request, response, next) => {
    for (let privilegio of request.session.privilegios) {
        // console.log(privilegio);
        if (
            privilegio.title ==
            "Líder consulta solicitudes de vacaciones de colaborador"
        ) {
            return next();
        }
        if (
            privilegio.title ==
            "Líder registra respuesta hacia solicitud de vacaciones de colaborador"
        ) {
            return next();
        }
        if (
            privilegio.title ==
            "Superadmin consulta solicitudes de vacaciones de empleado"
        ) {
            return next();
        }
        if (
            privilegio.title ==
            "Superadmin registra respuesta hacia solicitud de vacaciones de empleado"
        ) {
            return next();
        }
    }
    return response
        .status(403)
        .send("Tus acciones han sido registradas y reportadas al superadmin");
};
