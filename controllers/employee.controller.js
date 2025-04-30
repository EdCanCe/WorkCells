const Employee = require("../models/employee.model");
const Department = require("../models/department.model");
const sessionVars = require("../util/sessionVars");
const WorkStatus = require("../models/workStatus.model");
const bcrypt = require("bcryptjs");
const openProfile = require("../util/openProfile");
const title = "Employees";
const pdfName = "employee";

exports.getAdd = (request, response, next) => {
    Promise.all([
        Employee.fetchCountry(),
        Employee.fetchRoleID(),
        Employee.fetchDepartment(),
    ])
        .then(([[countries], [roles], [departments]]) => {
            // Limpiar el mensaje después de usarlo
            response.render("employeeAdd", {
                ...sessionVars(request, title, pdfName), // Variables de la sesión
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
        request.body.phoneNumber,
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
                            ...sessionVars(request, title, pdfName),
                            employee: employee,
                            country: country, // País específico del empleado
                            roleUser: role, // Rol específico del empleado
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
    const phoneNumber = request.body.phoneNumber;
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
        phoneNumber,
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
        phoneNumber,
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
                console.log(dateOfDeactivation);
                return WorkStatus.updateEndDate(userID, dateOfDeactivation);
            }

            if (dateOfDeactivation) {
                // Si el estado cambió a "Idle", actualizamos el campo endDate
                return WorkStatus.updateEndDate(userID, dateOfDeactivation);
            }
        })
        .then(() => {
            // Si la actualización fue exitosa, redirigir al usuario
            request.session.info = "Employee edited successfully.";
            response.redirect(`/employee/${userID}`);
        })
        .catch((error) => {
            console.error("There was an error editing the employee", error);
            request.session.info =
                error.message || "Error editing the employee.";
            response.redirect(`/employee/${userID}/modify`);
        });
};

exports.getProfile = (request, response, next) => {
    // Dependiendo de si hay usuario en el params, obtiene el usuario de params o session
    const userID =
        request.params.userID === undefined
            ? request.session.userID
            : request.params.userID;

    // En caso de haber no usuario en params, marca que el perfil es propio
    const isOwn = userID === request.session.userID;

    // Si es dueño de su propio perfil, mandar a renderizar
    if (isOwn) {
        return openProfile(request, response, userID, isOwn);
    }

    // Si es SuperAdmin, mandar a renderizar
    if (request.session.role === "Manager") {
        return openProfile(request, response, userID, isOwn);
    }

    // Significa que es un líder de departamento
    Department.getLeaderDepartment(userID)
        .then(([rows]) => {
            // En caso que el líder del colaborador sea el usuario, renderiza el perfil
            if (rows[0].userID === request.session.userID) {
                return openProfile(request, response, userID, isOwn);
            }

            // Como es return arriba, si no es líder manda el error:
            request.session.info =
                "You have no permission to view this profile";
            response.redirect("/error");
        })
        .catch(() => {
            request.session.info = "The user has no leader department";
            response.redirect("/error");
        });
};

exports.getRoot = (request, response, next) => {
    response.render("employee", {
        ...sessionVars(request, title, pdfName),
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

exports.getChangePassword = (request, response, next) => {
    response.render("employeeChangePassword", {
        ...sessionVars(request, title, pdfName),
    });
};

exports.postChangePassword = (request, response, next) => {
    const userID = request.session.userID;
    const newPassword = request.body.newPassword;
    const confirmNewPassword = request.body.confirmNewPassword;

    // console.log("Procesando cambio de contraseña para ID:", userID);

    // Verificar que las contraseñas coinciden
    if (newPassword !== confirmNewPassword) {
        request.session.warning = "Las contraseñas no coinciden.";
        return response.redirect("/employee/me/changePassword");
    }

    // Validar la fortaleza de la contraseña en el servidor
    const specialCharacters = /[!"#$%&/()\=?¡+*{}\[\];:,.|°]/;
    const upperCharacters = /[A-Z]/;
    const numericCharacters = /\d/;

    if (!upperCharacters.test(newPassword)) {
        request.session.warning =
            "La contraseña debe contener al menos una letra mayúscula.";
        return response.redirect("/employee/me/changePassword");
    }

    if (!specialCharacters.test(newPassword)) {
        request.session.warning =
            "La contraseña debe contener al menos un carácter especial.";
        return response.redirect("/employee/me/changePassword");
    }

    if (!numericCharacters.test(newPassword)) {
        request.session.warning =
            "La contraseña debe contener al menos un número.";
        return response.redirect("/employee/me/changePassword");
    }

    if (newPassword.length <= 8) {
        request.session.warning =
            "La contraseña debe tener más de 8 caracteres.";
        return response.redirect("/employee/me/changePassword");
    }

    // Crear una función async para manejar el flujo de promesas de manera más clara
    const processPasswordChange = async () => {
        try {
            // Obtener los datos del usuario
            const [userData] = await Employee.fetchUser(userID);

            if (!userData || userData.length === 0) {
                console.error("Usuario no encontrado:", userID);
                request.session.warning = "Usuario no encontrado.";
                return response.redirect("/employee/me/changePassword");
            }

            const user = userData[0];
            console.log("Usuario encontrado, passwdFlag:", user.passwdFlag);

            // Si es usuario con contraseña ya cambiada previamente
            if (user.passwdFlag == 1) {
                const currentPassword = request.body.currentPassword;

                if (!currentPassword) {
                    request.session.warning =
                        "Se requiere la contraseña actual.";
                    return response.redirect("/employee/me/changePassword");
                }

                // Verificar la contraseña actual
                const isMatch = await bcrypt.compare(
                    currentPassword,
                    user.passwd
                );
                if (!isMatch) {
                    request.session.warning =
                        "La contraseña actual es incorrecta.";
                    return response.redirect("/employee/me/changePassword");
                }

                // Verificar que la nueva contraseña sea diferente
                const isSamePassword = await bcrypt.compare(
                    newPassword,
                    user.passwd
                );
                if (isSamePassword) {
                    request.session.warning =
                        "La nueva contraseña debe ser diferente a la actual.";
                    return response.redirect("/employee/me/changePassword");
                }

                // Actualizar la contraseña
                await Employee.updatePassword(userID, newPassword);
            } else {
                // Para usuarios que hacen su primer cambio de contraseña
                console.log("Actualizando contraseña por primera vez...");
                await Employee.updatePasswordFirstTime(userID, newPassword);
            }

            console.log("Contraseña actualizada con éxito para ID:", userID);
            request.session.info = "Contraseña actualizada correctamente.";
            request.session.passwdFlag = 1;
            return response.redirect("/employee/me");
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            request.session.warning =
                "Error al cambiar la contraseña: " + error.message;
            return response.redirect("/employee/me/changePassword");
        }
    };

    // Ejecutar la función async
    processPasswordChange().catch((error) => {
        console.error("Error en processPasswordChange:", error);
        // En caso de que haya un error no manejado y no se haya enviado respuesta aún
        if (!response.headersSent) {
            request.session.warning =
                "Error inesperado al cambiar la contraseña.";
            return response.redirect("/employee/me/changePassword");
        }
    });
};

exports.getEmployeeFaults = (request, response, next) => {
    // Dependiendo de si hay usuario en el params, obtiene el usuario de params o session
    const userID =
        request.params.userID === undefined
            ? request.session.userID
            : request.params.userID;

    // Si no es el dueño de las faltas ni es SuperAdmin, no tiene permisos
    if (
        userID !== request.session.userID &&
        request.session.role !== "Manager"
    ) {
        request.session.alert = "You have no permission to view this";
        response.redirect("/error");
    }

    // Renderiza las faltas del usuario
    Employee.getOwnFaults(userID)
        .then(([faults, fieldData]) => {
            console.log(faults);
            response.render("employeeFaults", {
                ...sessionVars(request, title, pdfName),
                faults: faults,
                employeeID: userID,
            });
        })
        .catch((err) => {
            console.error("Error obtaining the faults:", err);
        });
};

exports.getMyProfile = (request, response, next) => {
    const userID = request.session.userID;
    response.send("entraste");
};
