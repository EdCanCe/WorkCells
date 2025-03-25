const Usuario = require("../models/user.model");

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

      // Comparación de contraseñas sin bcrypt
      if (password === user.passwd) {
        req.session.isLoggedIn = true;
        req.session.mail = email;
        req.session.userID = user.userID; // Asignar userID a la sesión
        console.log("UserID from session:", req.session.userID);
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
