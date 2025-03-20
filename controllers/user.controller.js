const Usuario = require("../models/user.model");
const bcrypt = require("bcryptjs");

// Renderiza la vista de login
exports.get_login = (req, res, next) => {
  const warning = req.session.warning || "";
  if (req.session.warning) req.session.warning = "";

  res.render("login.ejs", {
    isLoggedIn: req.session.isLoggedIn || false,
    warning: warning,
    csrfToken: req.csrfToken(),
  });
};

// Procesa el login y valida usando el modelo
exports.post_login = (req, res, next) => {
  const { email, password } = req.body;

  // Buscar usuario en la base de datos
  Usuario.fetchOne(email)
    .then(([rows]) => {
      if (rows.length === 0) {
        req.session.warning = "Usuario y/o contraseña incorrectos";
        return res.redirect("/login");
      }

      const user = rows[0];

      // Compara contraseñas
      /* Comentado hasta que este Superadmin registra alta de empleados
      bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          return req.session.save(() => res.redirect("/home"));
        } else {
          req.session.warning = "Usuario y/o contraseña incorrectos";
          return res.redirect("/login");
        }
      });*/
      // borrar esta comparación cuando este encriptada la contraseña

      // Comparación insegura (solo temporal hasta que uses bcrypt)
      if (password === user.passwd) {
        req.session.isLoggedIn = true;
        return req.session.save(() => res.redirect("/home"));
      } else {
        req.session.warning = "Usuario y/o contraseña incorrectos";
        return res.redirect("/login");
      }
    })
    .catch((error) => {
      console.error("Error al buscar el usuario:", error);
      req.session.warning = "Hubo un problema con el servidor";
      res.redirect("/login");
    });
};

// Cierra sesión
exports.get_logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
