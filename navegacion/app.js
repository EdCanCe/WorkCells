const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const colaborador = require("./routes/colaborador.routes");
const lider = require("./routes/lider.routes");

app.use("/inicio", colaborador);
app.use("/inicio", lider);

app.listen(3000);
