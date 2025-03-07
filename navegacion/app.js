const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const departmentRouter = require('./routes/department.routes');
app.use('/department', departmentRouter);

const homeRouter = require('./routes/home.routes');
app.use('/home', homeRouter);
app.use('/', homeRouter);
const faults_routers = require("./routes/faults.routes");
const absences_routers = require("./routes/absences.routes");

app.use("/fault", faults_routers);
app.use("/absence", absences_routers);

app.use((request, response, next) => {
  //Manda la respuesta
  response.statusCode = 404;
  response.send("No se encontró la ruta");
});

app.listen(3000);
