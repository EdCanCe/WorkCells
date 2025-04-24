const Usuario = require("../models/user.model");
const sessionVars = require('../util/sessionVars');

// Renderiza la vista de login
exports.get_login = (request, response, next) => {
    response.render("login.ejs", {
        ...sessionVars(request),
    });
};

// Procesa el login y valida usando el modelo
exports.post_login = (request, response, next) => {
    const { email, password } = request.body;

    // Buscar usuario en la base de datos
    Usuario.fetchOne(email)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.warning = "User and/or password incorrect";
                return response.redirect("/login");
            }

            const user = rows[0];

            const bycrypt = require('bcryptjs');
            bycrypt.compare(password, user.passwd).then((doMatch)=>{
                if(doMatch){
                    request.session.workStatus = user.workStatus; 
                    request.session.isLoggedIn = true;
                    request.session.mail = email;
                    request.session.userID = user.userID;
                    request.session.role = user.role;
                    request.session.passwdFlag = user.passwdFlag;

                    // Obtener privilegios del usuario
                    return Usuario.getPrivilegios(user.mail)
                        .then(([privilegios]) => {
                            request.session.privilegios = privilegios;
                            if(request.session.workStatus === 1){
                                if (request.session.passwdFlag === 1) {
                                    return request.session.save(() =>
                                        response.redirect("/home")
                                    );
                                } else {
                                    return request.session.save(() =>
                                        response.redirect("/employee/me/changePassword")
                                    );
                                }
                        }
                        request.session.warning =
                                "Tu cuenta esta inactiva";
                            response.redirect("/login");

                        })
                        .catch((error) => {
                            console.error("Error al obtener privilegios:", error);
                            request.session.warning =
                                "There was a problem with the database";
                            response.redirect("/login");
                        });
                } else {
                    request.session.warning = "User and/or password incorrect";
                    return response.redirect("/login");
                }
            })
        })
        .catch((error) => {
            console.error("Error al buscar el usuario:", error);
            request.session.warning = "There was a problem with the database";
            response.redirect("/login");
        });
};

// Cierra sesión
exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect("/login");
    });
};