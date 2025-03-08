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
const absences_routers = require("./routes/absences.routes");
const employeeRouter = require('./routes/employee.routes');
const vacationRouter = require("./routes/vacation.routes");


app.use('/department', departmentRouter);
app.use('/home', homeRouter);
app.use("/fault", faults_routers);
app.use('/absence', absences_routers);
app.use('/employee', employeeRouter);
app.use("/vacation", vacationRouter);


app.use("/", homeRouter);
const holidayRouter = require("./routes/holiday.routes.js");
app.use("/holiday", holidayRouter);

const oneToOneRouter = require("./routes/oneToOne.routes.js");
app.use("/oneToOne", oneToOneRouter);

app.use((request, response, next) => {
  response.statusCode = 404;
  response.render('notFound');
});

app.listen(3000);
