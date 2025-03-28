const Employee = require("../models/employee.model");

exports.getAdd = (request, response, next) => {
    const mensaje = request.session.info || ""; // Obtener mensaje de la sesión

    Promise.all([
        Employee.fetchCountry(),
        Employee.fetchRoleID(),
        Employee.fetchDepartment(),
    ])
        .then(([[countries], [roles], [departments]]) => {
            // Limpiar el mensaje después de usarlo
            request.session.info = "";
            response.render("employeeAdd", {
                employees: countries, // Lista de países
                roles: roles, // Lista de roles
                departments: departments, // Lista de departamentos
                isLoggedIn: request.session.isLoggedIn || false,
                info: mensaje, // Mensaje de sesión
                csrfToken: request.csrfToken(),
            });
        })
        .catch((error) => {
            console.error("Error al obtener datos:", error);
            response.status(500).send("Error al cargar la página");
        });
};

exports.postAdd = (request, response, next) => {
    console.log("Datos del formulario:", request.body); // 👈 Depuración aquí
    const mensaje = request.session.info || ""; // Obtén el mensaje de la sesión

    // Limpiar el mensaje después de usarlo
    request.session.info = "";

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
    response.render("employeeCheckModify");
};

exports.getCheck = (request, response, next) => {
    response.render("employeeCheck");
};

exports.getMe = (request, response, next) => {
    response.render("employeeMe");
};

exports.getRoot = (request, response, next) => {
    const mensaje = request.session.info || "";

    // Limpiar la sesión después de usar el mensaje
    request.session.info = "";

    response.render("employee", {
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || "",
        info: mensaje, // Aquí pasamos el mensaje de éxito o error
    });
};
