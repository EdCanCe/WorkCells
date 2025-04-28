const { request } = require("http");
const Usuario = require("../models/user.model");
const passport = require("passport");
require("../util/google-auth.js");

exports.getGoogleAuth = passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account",
});

exports.getGoogleCallback = passport.authenticate("google",
    { failureRedirect: "/login" });

exports.getGoogleRedirect = (request, response, next) => {
    console.log(request.user);
    const email = request.user.emails[0].value;
    
    Usuario.fetchOne(email)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.warning = "User and/or password incorrect";
                return response.redirect("/login");
            }

            const user = rows[0];

            request.session.isLoggedIn = true;
            request.session.mail = email;
            request.session.userID = user.userID;
            request.session.role = user.role;
            request.session.passwdFlag = user.passwdFlag;

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
                });
        });
}