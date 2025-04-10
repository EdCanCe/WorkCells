const { session } = require("passport");
const sessionVars = require("../util/sessionVars");

exports.getDepartments = (request, response, next) => {
    const role = sessionVars(request).role;

    // vista del lider para ver su departamento
    if (role === "Department Leader") {
        response.send("Vista del lider");
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
