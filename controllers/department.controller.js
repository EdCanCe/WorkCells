const sessionVars = require("../util/sessionVars");
const Department = require("../models/department.model");
const Enterprise = require("../models/enterprise.model");
const Employee = require("../models/employee.model");
const { create } = require("domain");
const title = "Departments";
const pdfName = "departments";

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
                    ...sessionVars(request, title, pdfName),
                    department: departmentData[0],
                    rows: rows,
                });
            })
            .catch((err) => {
                console.log(err);
                response.status(500).send("There was an error in the server.");
            });
    }
    // vista del superadmin
    else {
        Department.getAllDepartments()
            .then(([rows, fieldData]) => {
                response.render("checkDepartment", {
                    ...sessionVars(request, title, pdfName),
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
                ...sessionVars(req, title, pdfName),
                department: deptRows[0], // un objeto { departmentID, title }
                employees: empRows, // array de empleados
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getPaginatedEmployeesRH = (request, response, next) => {
    const departmentID = request.params.departmentID;
    const page = parseInt(request.query.page) || 1;
    const query = request.query.query || "";
    const limit = 6;
    const offset = (page - 1) * limit;

    const searchPromise = query
        ? Department.searchWorkersByName(departmentID, query)
        : Department.getEmployeesInDepartmentInfoPaginated(
              departmentID,
              limit,
              offset
          );

    searchPromise
        .then(([rows]) => {
            response.json({ rows, page, query });
        })
        .catch((err) => {
            console.log(err);
            response
                .status(500)
                .json({ err: "There was an error trying to fetch the employees." });
        });
};

exports.getEmployeesPaginated = async (request, response, next) => {
    const userID = request.session.userID;
    const page = parseInt(request.query.page) || 1;
    const query = request.query.query;
    const limit = 6;
    const offset = (page - 1) * limit;
    const [[department]] = await Department.getLeaderDepartment(userID);
    const leaderDepartmentID = department.prioritaryDepartmentIDFK;

    const searchPromise = query
        ? Department.searchWorkersByName(leaderDepartmentID, query)
        : Department.getEmployeesInDepartmentPaginated(
              leaderDepartmentID,
              request.session.userID,
              limit,
              offset
          );

    searchPromise
        .then(([rows]) => {
            response.json({ rows, page, query });
        })
        .catch((err) => {
            console.log(err);
            response
                .status(500)
                .json({ err: "There was an error trying to fetch the employees." });
        });
};

exports.getDepartmentsPaginated = async (request, response, next) => {
    const page = parseInt(request.query.page) || 1;
    const query = request.query.query || "";
    const limit = 4;
    const offset = (page - 1) * limit;

    const searchPromise = query
        ? Department.searchDepartmentByName(query)
        : Department.getAllDepartmentsPaginated(limit, offset);

    searchPromise
        .then(([rows]) => {
            response.json({ rows, page, query });
        })
        .catch((err) => {
            console.log(err);
            response
                .status(500)
                .json({ err: "There was an error trying to fetch the departments." });
        });
};

exports.getAddDepartment = (request, response, next) => {
    // Obtiene todas las empress
    Enterprise.fetchAll().then(([enterprises]) => {
        // Obtiene todos los datos de los empleados
        Employee.fetchAllUserRoles().then(([employees]) => {
            // Filtra los empleados por colaboradores
            const collaborators = employees.filter(
                (employee) => employee.role === "Colaborator"
            );

            // Filtra los empleados por líderes de departamento
            const leaders = employees.filter(
                (employee) => employee.role === "Department Leader"
            );

            response.render("addDepartment", {
                ...sessionVars(request, title, pdfName),
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
        const department = new Department(
            request.body.department,
            request.body.leader,
            enterpriseID,
            request.body.collaboratorArray,
            null
        );

        // Guarda el departamento en la base de datos
        department.save().then((departmentID) => {
            response.redirect(`/department/${departmentID}`);
        });
    };

    // Obtiene el ID de la empresa generada
    Enterprise.fetchByName(request.body.enterprise).then(([enterprise]) => {
        // En caso de que no exista, se crea la empresa
        if (enterprise.length == 0) {
            const enterprise = new Enterprise(request.body.enterprise);
            enterprise.save().then((newEnterprise) => {
                createDepartment(newEnterprise);
            });
        } else {
            createDepartment(enterprise[0].enterpriseID);
        }
    });
};

exports.getCheckDepartment = (request, response, next) => {
    response.render("checkOneDpmt", {
        ...sessionVars(request, title, pdfName),
    });
};


exports.getModifyDepartment = async (request, response, next) => {
    try {
        // Obtiene los datos del departamento
        const [department] = await Department.fetchByID(
            request.params.departmentID
        );

        // Obtiene los trabajadores del departamento
        const [departmentEmployees] = await Employee.fetchAllUsersByDepartment(
            request.params.departmentID
        );

        // Filtra los empleados por colaboradores
        const departmentCollaborators = departmentEmployees.filter(
            (employee) => employee.role === "Colaborator"
        );

        // Filtra los empleados por líderes de departamento
        const departmentLeader = departmentEmployees.filter(
            (employee) => employee.role === "Department Leader"
        );

        // Obtiene todas las empresas
        const [enterprises] = await Enterprise.fetchAll();

        // Obtiene todos los datos de los empleados
        const [employees] = await Employee.fetchAllUserRoles();

        // Filtra los empleados por colaboradores
        const collaborators = employees.filter(
            (employee) => employee.role === "Colaborator"
        );

        // Filtra los empleados por líderes de departamento
        const leaders = employees.filter(
            (employee) => employee.role === "Department Leader"
        );

        response.render("modifyDepartment", {
            ...sessionVars(request, title, pdfName),
            departmentCollaborators,
            enterprises,
            collaborators,
            leaders,
            departmentID: request.params.departmentID,
            department: department[0],
            departmentLeader: departmentLeader[0],
        });
    } catch (error) {
        console.log(error);
    }
};

exports.postModifyDepartment = (request, response, next) => {
    // Crea el departamento
    const updateDepartment = (enterpriseID) => {
        // Llena los datos del departamento
        const department = new Department(
            request.body.department,
            request.body.leader,
            enterpriseID,
            request.body.collaboratorArray,
            request.params.departmentID,
            request.body.flag
        );

        // Guarda el departamento en la base de datos
        department.update().then((departmentID) => {
            response.redirect(`/department/${departmentID}`);
        });
    };

    // Obtiene el ID de la empresa generada
    Enterprise.fetchByName(request.body.enterprise).then(([enterprise]) => {
        // En caso de que no exista, se crea la empresa
        if (enterprise.length == 0) {
            const enterprise = new Enterprise(request.body.enterprise);
            enterprise.save().then((newEnterprise) => {
                updateDepartment(newEnterprise);
            });
        } else {
            updateDepartment(enterprise[0].enterpriseID);
        }
    });
};
