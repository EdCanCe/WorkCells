const Employee = require("../models/employee.model");
const sessionVars = require('../util/sessionVars');

exports.getAdd = (request, response, next) => {
    Promise.all([
        Employee.fetchCountry(),
        Employee.fetchRoleID(),
        Employee.fetchDepartment(),
    ])
        .then(([[countries], [roles], [departments]]) => {
            // Limpiar el mensaje después de usarlo
            response.render("employeeAdd", {
                ...sessionVars(request), // Variables de la sesión
                employees: countries, // Lista de países
                roles: roles, // Lista de roles
                departments: departments, // Lista de departamentos
            });
        })
        .catch((error) => {
            console.error("Error al obtener datos:", error);
            response.status(500).send("Error al cargar la página");
        });
};

exports.postAdd = (request, response, next) => {
    console.log("Datos del formulario:", request.body); // 👈 Depuración aquí

    const curp = request.body.curp;

    // Crear una nueva instancia de Employee
    const employee = new Employee(
        curp,
        request.body.rfc,
        request.body.birthName,
        request.body.surname,
        request.body.mail,
        request.body.zipCode,
        request.body.houseNumber,
        request.body.streetName,
        request.body.colony,
        request.body.workModality,
        request.body.userRoleIDFK,
        request.body.countryUserIDFK,
        request.body.prioritaryDepartmentIDFK
    );

    // Intentar guardar el empleado
    employee
        .save()
        .then(() => {
            // Si la inserción fue exitosa, redirigir con mensaje
            request.session.info = "Empleado creado correctamente.";
            response.redirect("/employee");
        })
        .catch((error) => {
            // Si ocurre un error (como que el CURP ya exista), mostrar el mensaje
            console.error(error);
            request.session.info =
                error.message || "Error al registrar el empleado.";
            response.redirect("/employee/add");
        });
};

exports.getModify = (request, response, next) => {
    response.render("employeeCheckModify", {
        ...sessionVars(request),
    });
};

exports.getCheck = (request, response, next) => {
    response.render("employeeCheck", {
        ...sessionVars(request),
    });
};

exports.getMe = (request, response, next) => {
    response.render("employeeMe", {
        ...sessionVars(request),
    });
};

exports.getRoot = (request, response, next) => {
    response.render("employee", {
        ...sessionVars(request),
    });
};
