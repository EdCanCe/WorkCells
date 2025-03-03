const express = require("express");
const app = express();

const colaborador = require("./routes/colaborador.routes");
const lider = require("./routes/lider.routes");

app.use("/Inicio", colaborador);
app.use("/Inicio", lider);

app.listen(3000);
