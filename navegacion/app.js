const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const colaboradorRoutes = require("./routes/colaborador.routes");
const liderRoutes = require("./routes/lider.routes");
const superAdminRoutes = require("./routes/superAdmin.routes");

app.use("/home", colaboradorRoutes);
app.use("/home", liderRoutes);
app.use("/home", superAdminRoutes);

app.use((request, response, next) => {
  //Manda la respuesta
  response.statusCode = 404;
  response.send("No se encontró la ruta");
});

app.listen(3000);
