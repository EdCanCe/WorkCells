const Employee = require("../models/employee.model");
const sessionVars = require("../util/sessionVars");
const WorkStatus = require("../models/workStatus.model");

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
    console.log("Datos del formulario:", request.body); // Depuración aquí

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
        .then((userID) => {
            console.log("Empleado creado con ID:", userID);

            // Crear y guardar el estado de trabajo asociado al usuario
            const workStatus = new WorkStatus(new Date(), null, userID);
            return workStatus.save();
        })
        .then(() => {
            // Si la inserción fue exitosa, redirigir con mensaje
            request.session.info = "Empleado creado correctamente.";
            response.redirect("/employee");
        })
        .catch((error) => {
            console.error("Error al registrar el empleado:", error.message);
            request.session.info =
                error.message || "Error al registrar el empleado.";
            response.redirect("/employee/add");
        });
};

exports.getModify = (request, response, next) => {
    const userID = request.params.id;

    Employee.fetchUser(userID)
        .then(([userData]) => {
            if (!userData || userData.length === 0) {
                request.session.info = "Empleado no encontrado.";
                return response.redirect("/employee");
            }

            const employee = userData[0];

            Promise.all([
                Employee.fetchCountryByID(employee.countryUserIDFK),
                Employee.fetchRoleByID(employee.userRoleIDFK),
                Employee.fetchDepartmentByID(employee.prioritaryDepartmentIDFK),
                Employee.fetchCountry(),
                Employee.fetchRoleID(),
                Employee.fetchDepartment(),
            ])
                .then(
                    ([
                        employeeCountry,
                        employeeRole,
                        employeeDepartment,
                        countries,
                        roles,
                        departments,
                    ]) => {
                        const country = employeeCountry[0] || null;
                        const role = employeeRole[0] || null;
                        const department = employeeDepartment[0] || null;

                        response.render("employeeCheckModify", {
                            ...sessionVars(request),
                            employee: employee,
                            country: country, // País específico del empleado
                            role: role, // Rol específico del empleado
                            department: department, // Departamento específico del empleado
                            countries: countries[0], // Lista completa de países
                            roles: roles[0], // Lista completa de roles
                            departments: departments[0], // Lista completa de departamentos
                        });
                    }
                )
                .catch((error) => {
                    console.error("Error al obtener catálogos:", error);
                    request.session.info =
                        "Error al cargar información del empleado.";
                    response.redirect("/employee");
                });
        })
        .catch((error) => {
            console.error("Error al obtener los datos del empleado:", error);
            request.session.info = "Error al obtener datos del empleado.";
            response.redirect("/employee");
        });
};

exports.postModify = (request, response, next) => {
    const userID = request.params.id;

    const curp = request.body.curp;
    const rfc = request.body.rfc;
    const birthName = request.body.birthName;
    const surname = request.body.surname;
    const mail = request.body.mail;
    const zipCode = request.body.zipCode;
    const houseNumber = request.body.houseNumber;
    const streetName = request.body.streetName;
    const colony = request.body.colony;
    const countryUserIDFK = request.body.countryUserIDFK;
    const workModality = request.body.workModality;
    const userRoleIDFK = request.body.userRoleIDFK;
    const prioritaryDepartmentIDFK = request.body.prioritaryDepartmentIDFK;
    const workStatus = request.body.workStatus;

    // Validación para asegurarse de que no haya campos undefined o vacíos
    const updatedEmployee = {
        userID,
        curp,
        rfc,
        birthName,
        surname,
        mail,
        zipCode,
        houseNumber,
        streetName,
        colony,
        countryUserIDFK,
        workModality,
        userRoleIDFK,
        prioritaryDepartmentIDFK,
        workStatus,
    };

    console.log("Campos antes de llamar a updateEmployee:", updatedEmployee);

    // Llamada a la función de actualización en la base de datos
    Employee.updateEmployee(
        userID,
        curp,
        rfc,
        birthName,
        surname,
        mail,
        zipCode,
        houseNumber,
        streetName,
        colony,
        workModality,
        userRoleIDFK,
        countryUserIDFK,
        prioritaryDepartmentIDFK,
        workStatus
    )
        .then(() => {
            let dateOfDeactivation = null;
            if (workStatus === "0") {
                dateOfDeactivation = new Date();
            }

            if (dateOfDeactivation) {
                // Si el estado cambió a "Idle", actualizamos el campo endDate
                return WorkStatus.updateEndDate(userID, dateOfDeactivation);
            }
        })
        .then(() => {
            // Si la actualización fue exitosa, redirigir al usuario
            request.session.info = "Empleado modificado con éxito.";
            response.redirect(`/employee/${userID}`);
        })
        .catch((error) => {
            console.error("Error al modificar empleado:", error);
            request.session.info =
                error.message || "Error al modificar el empleado.";
            response.redirect(`/employee/${userID}/modify`);
        });
};

exports.getCheck = (request, response, next) => {
    const userID = request.params.id;

    Employee.fetchUser(userID)
        .then(([userData]) => {
            if (!userData || userData.length === 0) {
                request.session.info = "Empleado no encontrado.";
                return response.redirect("/employee");
            }

            const employee = userData[0];
            // Obtener datos adicionales (país, rol y departamento)
            Promise.all([
                Employee.fetchCountryByID(employee.countryUserIDFK),
                Employee.fetchRoleByID(employee.userRoleIDFK),
                Employee.fetchDepartmentByID(employee.prioritaryDepartmentIDFK),
            ])
                .then(([countries, roles, departments]) => {
                    const country = countries[0] ? countries[0][0] : null; // Accede al primer objeto dentro del primer array
                    const role = roles[0] ? roles[0][0] : null;
                    const department = departments[0]
                        ? departments[0][0]
                        : null;

                    // Renderizar la vista con todos los datos
                    response.render("employeeCheck", {
                        ...sessionVars(request),
                        employee: employee,
                        country: country,
                        role: role,
                        department: department,
                    });
                })
                .catch((error) => {
                    console.error("Error al obtener catálogos:", error);
                    request.session.info =
                        "Error al cargar información del empleado.";
                    response.redirect("/employee");
                });
        })
        .catch((error) => {
            console.error("Error al obtener los datos del empleado:", error);
            request.session.info = "Error al obtener datos del empleado.";
            response.redirect("/employee");
        });
};

exports.getMe = (request, response, next) => {
    // TODO: hacer verificaciones de superAdmin, lider y colaborador
    const userid = request.session.userID;
    console.log("ID =", userid);
    
    Employee.fetchAllDataUser(userid)
    .then(([rows])=>{
        response.render("employeeMe", {
            ...sessionVars(request),
            userData: rows[0],
            API: process.env.GEOLOCATION_API_KEY,
        });
    })
    .catch((error)=>{
        console.error("this is your error: ",error);
        request.session.alert = "can not find user";
        response.redirect("/error");
    });


};

exports.getRoot = (request, response, next) => {
    response.render("employee", {
        ...sessionVars(request),
    });
};

exports.getSearch = (request, response, next) => {
    const page = parseInt(request.query.page) || 1;
    const query = request.query.query || "";
    const filter = request.query.filter || "all";
    const limit = 6;
    const offset = (page - 1) * limit;

    let searchPromise;

    if (query) {
        searchPromise =
            filter === "active"
                ? Employee.searchActiveByName(query)
                : filter === "inactive"
                ? Employee.searchInactiveByName(query)
                : Employee.searchByName(query);
    } else {
        searchPromise =
            filter === "active"
                ? Employee.fetchPaginatedActive(limit, offset)
                : filter === "inactive"
                ? Employee.fetchPaginatedInactive(limit, offset)
                : Employee.fetchPaginated(limit, offset);
    }

    Promise.all([searchPromise, Employee.countFilteredEmployees(query, filter)])
        .then(([[employees], [countRow]]) => {
            const totalCount = countRow[0]?.total || 0;
            response.json({ employees, page, query, filter, totalCount });
        })
        .catch((error) => {
            console.error("Error en la búsqueda/paginación:", error);
            response
                .status(500)
                .json({ error: "Error en la búsqueda/paginación" });
        });
};

exports.getMyProfile =(request, response, next) => {
    const userID = request.session.userID;
    response.send("entraste");
}
