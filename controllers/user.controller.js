const Usuario = require("../models/user.model");

// Renderiza la vista de login
exports.get_login = (request, response, next) => {
    const warning = request.session.warning || "";
    if (request.session.warning) request.session.warning = "";

    response.render("login.ejs", {
        isLoggedIn: request.session.isLoggedIn || false,
        warning: warning,
        csrfToken: request.csrfToken(),
    });
};

// Procesa el login y valida usando el modelo
exports.post_login = (request, response, next) => {
    const { email, password } = request.body;

    // Buscar usuario en la base de datos
    Usuario.fetchOne(email)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.warning = "Usuario y/o contraseña incorrectos";
                return response.redirect("/login");
            }

            const user = rows[0];

            // Comparación de contraseñas sin bcrypt (se recomienda usar bcrypt para mayor seguridad)
            if (password === user.passwd) {
                request.session.isLoggedIn = true;
                request.session.mail = email;
                request.session.userID = user.userID;
                request.session.role = user.role;

                console.log("UserID from session:", request.session.userID);
                console.log("Valor de user.mail:", request.session.mail);
                console.log("role: ", request.session.role);
                // Obtener privilegios del usuario
                return Usuario.getPrivilegios(user.mail)
                    .then(([privilegios]) => {
                        console.log("Privilegios obtenidos:", privilegios);
                        request.session.privilegios = privilegios;
                        return request.session.save(() =>
                            response.redirect("/home")
                        );
                    })
                    .catch((error) => {
                        console.error("Error al obtener privilegios:", error);
                        request.session.warning =
                            "Hubo un problema con el servidor";
                        response.redirect("/login");
                    });
            } else {
                request.session.warning = "Usuario y/o contraseña incorrectos";
                return response.redirect("/login");
            }
        })
        .catch((error) => {
            console.error("Error al buscar el usuario:", error);
            request.session.warning = "Hubo un problema con el servidor";
            response.redirect("/login");
        });
};

// Cierra sesión
exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect("/login");
    });
};
