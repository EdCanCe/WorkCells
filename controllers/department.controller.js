const sessionVars = require("../util/sessionVars");
const Department = require("../models/department.model");
const Enterprise = require("../models/enterprise.model");
const Employee = require("../models/employee.model");
const { create } = require("domain");

exports.getDepartments = (request, response, next) => {
    const role = sessionVars(request).role;

    // vista del lider para ver su departamento
    if (role === "Department Leader") {
        let departmentData;

        Department.getLeaderDepartment(request.session.userID)
            .then(([department, fieldData]) => {
                departmentData = department;
                const leaderDepartmentID =
                    department[0].prioritaryDepartmentIDFK;

                return Department.getEmployeesInDepartment(
                    leaderDepartmentID,
                    request.session.userID
                );
            })
            .then(([rows, fieldData]) => {
                //console.log(rows);
                response.render("leaderDepartmentList", {
                    ...sessionVars(request),
                    department: departmentData,
                    rows: rows,
                });
            })
            .catch((err) => {
                console.log(err);
                response.status(500).send("Error del servidor");
            });
    }
    // vista del superadmin, modificar en un futuro
    else {
        Department.getAllDepartments()
            .then(([rows, fieldData]) => {
                response.render("checkDepartment", {
                    ...sessionVars(request),
                    rows: rows,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

exports.getEmployees = (req, res, next) => {
    const departmentID = req.params.departmentID;

    Promise.all([
        Department.getDepartmentById(departmentID), // → [[{ departmentID, title }], …]
        Department.getEmployeesInDepartmentInfo(departmentID), // → [[…empleados…], …]
    ])
        .then(([[deptRows], [empRows]]) => {
            if (!deptRows.length) {
                return res.status(404).render("404");
            }

            res.render("RHDepartmentList", {
                ...sessionVars(req),
                department: deptRows[0], // un objeto { departmentID, title }
                employees: empRows, // array de empleados
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getPaginatedEmployeesRH = (req, res, next) => {
    const departmentID = req.params.departmentID;
    console.log(departmentID);
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    Department.getEmployeesInDepartmentInfoPaginated(
        departmentID,
        limit,
        offset
    )
        .then(([rows]) => {
            res.json(rows);
        })
        .catch(next);
};

exports.getEmployeesPaginated = async (request, response, next) => {
    const page = parseInt(request.query.page) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    try {
        const [[department]] = await Department.getLeaderDepartment(
            request.session.userID
        );
        const leaderDepartmentID = department.prioritaryDepartmentIDFK;

        const [rows] = await Department.getEmployeesInDepartmentPaginated(
            leaderDepartmentID,
            request.session.userID,
            limit,
            offset
        );
        response.json(rows);
    } catch {
        console.log(error);
        response
            .status(500)
            .json({ error: "Error al obtener los colaboradores" });
    }
};

exports.getDepartmentsPaginated = async (request, response, next) => {
    const page = parseInt(request.query.page) || 1;
    const limit = 4;
    const offset = (page - 1) * limit;

    try {
        const [rows] = await Department.getAllDepartmentsPaginated(
            limit,
            offset
        );
        response.json(rows);
    } catch (error) {
        console.log(error);
        response
            .status(500)
            .json({ error: "Error al obtener los departamentos" });
    }
};

exports.getAddDepartment = (request, response, next) => {
    // Obtiene todas las empress
    Enterprise.fetchAll()
        .then(([enterprises]) => {
            // Obtiene todos los datos de los empleados
            Employee.fetchAllUserRoles()
                .then(([employees]) => {
                    // Filtra los empleados por colaboradores
                    const collaborators = employees.filter((employee) =>
                        employee.role === "Colaborator"
                    );

                    // Filtra los empleados por líderes de departamento
                    const leaders = employees.filter((employee) =>
                        employee.role === "Department Leader"
                    );

                    response.render("addDepartment", {
                        ...sessionVars(request),
                        enterprises,
                        collaborators,
                        leaders,
                    });
                });
        });
};

exports.postAddDepartment = (request, response, next) => {
    // Crea el departamento
    const createDepartment = (enterpriseID) => {
        // Llena los datos del departamento
        const department = new Department(request.body.department, request.body.leader, enterpriseID, request.body.collaboratorArray);

        // Guarda el departamento en la base de datos
        department.save()
            .then((departamentID) => {
                response.redirect(`/department/${departamentID}`);
            });
    };

    // Obtiene el ID de la empresa generada
    Enterprise.fetchByName(request.body.enterprise)
        .then(([enterprise]) => {
            // En caso de que no exista, se crea la empresa
            if (enterprise.length == 0) {
                const enterprise = new Enterprise(request.body.enterprise);
                enterprise.save()
                    .then((newEnterprise) => {
                        createDepartment(newEnterprise);
                    });
            } else {
                createDepartment(enterprise[0].enterpriseID);
            }
        })
};

exports.getCheckDepartment = (request, response, next) => {
    response.render("checkOneDpmt", {
        ...sessionVars(request),
    });
};

exports.postDeleteDeparment = (request, response, next) => {
    console.log(request.session);
};

exports.getModifyDepartment = (request, response, next) => {
    response.render("modifyDepartment", {
        ...sessionVars(request),
        // TODO: Hacer la fokin conexión con la base de datos para obtener el fokin id del departamento
    });
};
