const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const colaborador = require("./routes/colaborador.routes");
const lider = require("./routes/lider.routes");

app.use("/Inicio", colaborador);
app.use("/Inicio", lider);

app.listen(3000);
