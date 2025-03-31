module.exports = (request, response, next) => {
    for (let privilegio of request.session.privilegios) {
        console.log(privilegio);
        if (
            privilegio.nombre ==
            "Líder consulta solicitudes de vacaciones de colaborador"
        ) {
            return next();
        }
        if (
            privilegio.nombre ==
            "Líder registra respuesta hacia solicitud de vacaciones de colaborador"
        ) {
            return next();
        }
        if (
            privilegio.nombre ==
            "Superadmin consulta solicitudes de vacaciones de empleado"
        ) {
            return next();
        }
        if (
            privilegio.nombre ==
            "Superadmin registra respuesta hacia solicitud de vacaciones de empleado"
        ) {
            return next();
        }
    }
    return response
        .status(403)
        .send("Tus acciones han sido registradas y reportadas al superadmin");
};
