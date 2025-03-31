module.exports = (request, response, next) => {
    for (let privilegio of request.session.privilegios) {
        if (
            privilegio.title ==
            "Superadmin registra fecha prevista de One-On-One"
        ) {
            return next();
        }
        if (privilegio.title == "Superadmin registra datos del One-On-One") {
            return next();
        }
    }
    return response
        .status(403)
        .send("Tus acciones han sido registradas y reportadas al superadmin");
};
