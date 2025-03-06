const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const colaborador = require("./routes/colaborador.routes");
const lider = require("./routes/lider.routes");
const superAdmin = require("./routes/superAdmin.routes");

app.use("/inicio", colaborador);
app.use("/inicio", lider);
app.use("/inicio", superAdmin);

app.listen(3000);
