const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const csrfProtection = csrf();
const multer = require("multer");
const passport = require("passport");
require("dotenv").config();
require("./util/google-auth.js");

app.set("view engine", "ejs");
app.set("views", "views");

const session = require("express-session");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(
    session({
        secret: process.env.CLIENT_SECRET,
        resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió
        saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
        rolling: true,
        cookie: {
            maxAge: 15 * 60 * 1000, // 15 minutos en milisegundos
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos
        callback(null, "uploads");
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor,
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        const original = file.originalname;
        const safe = original
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^a-z0-9._-]/g, "");

        callback(null, new Date().getTime() + safe);
    },
});

//En el registro, pasamos la constante de configuración y
//usamos single porque es un sólo archivo el que vamos a subir,
//pero hay diferentes opciones si se quieren subir varios archivos.
//'archivo' es el nombre del input tipo file de la forma
app.use(multer({ storage: fileStorage }).single("evidence"));

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
  );

app.use(csrfProtection);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);
app.use("/google", authRouter);

const usersRouter = require("./routes/user.routes");
app.use("/login", usersRouter);

const calendarRouter = require("./routes/calendar.routes");
app.use("/calendar", calendarRouter);

const departmentRouter = require("./routes/department.routes");
app.use("/department", departmentRouter);

const faultsRouters = require("./routes/faults.routes");
app.use("/fault", faultsRouters);

const absencesRouter = require("./routes/absences.routes");
app.use("/absence", absencesRouter);

const employeeRouter = require("./routes/employee.routes");
app.use("/employee", employeeRouter);

const vacationRouter = require("./routes/vacation.routes");
app.use("/vacation", vacationRouter);

const holidayRouter = require("./routes/holiday.routes.js");
app.use("/holiday", holidayRouter);

const oneToOneRouter = require("./routes/oneToOne.routes.js");
app.use("/oneToOne", oneToOneRouter);

const reportRouter = require("./routes/report.routes.js");
app.use("/reports", reportRouter);

const homeRouter = require("./routes/home.routes");
app.use("/home", homeRouter);
app.use("/", homeRouter);

const uploadRouter = require("./routes/uploads.routes.js");
app.use("/uploads", uploadRouter);

const sessionVars = require("./util/sessionVars");
app.use((request, response, next) => {
    response.statusCode = 404;
    response.render("notFound", {
        ...sessionVars(request, 'ERROR 404'),
    });
});

app.listen(3000);
