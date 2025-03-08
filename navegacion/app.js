const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const departmentRouter = require('./routes/department.routes');
const homeRouter = require('./routes/home.routes');
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

app.use((request, response, next) => {
  //Manda la respuesta
  response.statusCode = 404;
  response.render('notFound');
});

app.listen(3000);
