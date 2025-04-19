const sessionVars = require("../util/sessionVars");
const Department = require("../models/department.model");

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
                console.log(rows);
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
    response.render("addDepartment", {
        ...sessionVars(request),
    });
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
