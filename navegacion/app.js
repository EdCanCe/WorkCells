const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const homeRouter = require('./routes/home.routes');
app.use('/home', homeRouter);
app.use('/', homeRouter);

const calendarRouter = require("./routes/calendar.routes");
app.use("/calendar", calendarRouter);

const departmentRouter = require('./routes/department.routes');
app.use('/department', departmentRouter);

const faults_routers = require("./routes/faults.routes");
app.use("/fault", faults_routers);

const absences_routers = require("./routes/absences.routes");
app.use("/absence", absences_routers);

const vacationRouter = require("./routes/vacation.routes");
app.use("/vacation", vacationRouter);

app.use("/", homeRouter);
const holidayRouter = require("./routes/holiday.routes.js");
app.use("/holiday", holidayRouter);

const oneToOneRouter = require("./routes/oneToOne.routes.js");
app.use("/oneToOne", oneToOneRouter);

app.use((request, response, next) => {
  response.statusCode = 404;
  response.send("No se encontró la ruta");
});

app.listen(3000);
