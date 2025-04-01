module.exports = (request, response, next) => {
    for (let privilegio of request.session.privilegios) {
        console.log(privilegio);
        if (privilegio.title == "Superadmin registra día feriado") {
            return next();
        }
    }
    return response
        .status(403)
        .send("Tus acciones han sido registradas y reportadas al superadmin");
};
