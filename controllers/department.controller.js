const Department = require("../models/department.model");
const sessionVars = require("../util/sessionVars");

exports.getDepartments = (request, response, next) => {
    const role = sessionVars(request).role;

    // vista del lider para ver su departamento
    if (role === "Department Leader") {
        Department.getLeaderDepartment(request.session.userID)
            .then(([department, fieldData]) => {
                const leaderDepartmentID =
                    department[0].prioritaryDepartmentIDFK;
                console.log(leaderDepartmentID);
                return Department.getEmployeesInDepartment(
                    leaderDepartmentID,
                    request.session.userID
                );
            })
            .then(([rows, fieldData]) => {
                console.log(rows);
            })
            .catch((err) => {
                console.log(err);
                response.status(500).send("Error del servidor");
            });
    }
    // vista del superadmin, modificar en un futuro
    else {
        response.render("checkDepartment", {
            ...sessionVars(request),
        });
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

exports.getModifyDepartment = (request, response, next) => {
    response.render("modifyDepartment", {
        ...sessionVars(request),
    });
};
