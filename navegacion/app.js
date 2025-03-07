const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const colaborador = require("./routes/colaborador.routes");
const lider = require("./routes/lider.routes");

app.use("/home", colaborador);
app.use("/home", lider);

app.use((request, response, next) => {
    console.log("Otro middleware!");
    //Manda la respuesta
    response.statusCode = 404;
    response.send("No se encontró la ruta");
    //set_header, set_wirte, set_end en una en send
  });

app.listen(3000);
