const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const csrfProtection = csrf();
const multer = require("multer");

app.set("view engine", "ejs");
app.set("views", "views");

const session = require("express-session");

app.use(
    session({
        secret: crypto.randomUUID(),
        resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió
        saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
    })
);

app.use(express.static(path.join(__dirname, "public")));


app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos
        callback(null, "public/uploads");
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor,
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, new Date().getTime() + file.originalname);
    },
});
//En el registro, pasamos la constante de configuración y
//usamos single porque es un sólo archivo el que vamos a subir,
//pero hay diferentes opciones si se quieren subir varios archivos.
//'archivo' es el nombre del input tipo file de la forma
app.use(multer({ storage: fileStorage }).single("evidence"));

app.use(csrfProtection);

const usersRoutes = require("./routes/user.routes");
app.use("/login", usersRoutes);
const homeRouter = require("./routes/home.routes");
app.use("/home", homeRouter);
app.use("/", homeRouter);

const calendarRouter = require("./routes/calendar.routes");
app.use("/calendar", calendarRouter);

const departmentRouter = require("./routes/department.routes");
app.use("/department", departmentRouter);

const faults_routers = require("./routes/faults.routes");
const absences_routers = require("./routes/absences.routes");
const employeeRouter = require("./routes/employee.routes");
const vacationRouter = require("./routes/vacation.routes");

app.use("/department", departmentRouter);
app.use("/home", homeRouter);
app.use("/fault", faults_routers);
app.use("/absence", absences_routers);
app.use("/employee", employeeRouter);
app.use("/vacation", vacationRouter);

app.use("/", homeRouter);
const holidayRouter = require("./routes/holiday.routes.js");
app.use("/holiday", holidayRouter);

const oneToOneRouter = require("./routes/oneToOne.routes.js");
app.use("/oneToOne", oneToOneRouter);

app.use((request, response, next) => {
    response.statusCode = 404;
    response.render("notFound");
});

app.listen(3000);
