const Report = require("../models/report.model");
const sessionVars = require("../util/sessionVars");

exports.getRoot = (request, response, next) => {
    response.render("reportsMenu", {
        ...sessionVars(request),
    });
};

exports.getEmployeeRotation = (request, response, next) => {
    // fecha actual
    const now = new Date();
    // fecha de inicio del mes actual
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split("T")[0];
    // fecha del ultimo día del mes actual
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];
    // información de usuarios activos, inactivos y departamentos
    const activeUsers = Report.getInfoActives(start, end);
    const inactiveUsers = Report.getInfoInactives(start, end);
    const departments = Report.getAllDepartments();
    // fecha inicial del año
    const startYear = new Date(now.getFullYear(), 0, 1)
        .toISOString()
        .split("T")[0];
    // fecha final del año
    const endYear = new Date(now.getFullYear(), 11, 31)
        .toISOString()
        .split("T")[0];
    // cantidad de empleados activos e inactivos por mes del año actual
    const activesPerMonth = Report.getActivesPerMonth(startYear, endYear);
    const inactivesPerMonth = Report.getInactivesPerMonth(startYear, endYear);
    // recibir las promesas de todas las consultas
    Promise.all([
        activeUsers,
        inactiveUsers,
        departments,
        activesPerMonth,
        inactivesPerMonth,
    ])
        .then(
            ([
                [activeUsers],
                [inactiveUsers],
                [departments],
                [activesPerMonth],
                [inactivesPerMonth],
            ]) => {
                response.render("reportRotation", {
                    ...sessionVars(request),
                    activeUsers: activeUsers,
                    inactiveUsers: inactiveUsers,
                    departments: departments,
                    activesPerMonth: activesPerMonth,
                    inactivesPerMonth: inactivesPerMonth,
                    activeSize: activeUsers.length,
                    inactiveSize: inactiveUsers.length,
                    currentMonthStart: start,
                    currentMonthEnd: end,
                });
            }
        )
        .catch((err) => {
            console.error(err);
            next(err);
        });
};

exports.getOneonOneDepartment = (request, response, next) => {
    // fecha actual
    const now = new Date();
    // fecha de inicio del mes actual
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split("T")[0];
    // fecha del ultimo día del mes actual
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];
    // información de usuarios activos, inactivos y departamentos
    const activeUsers = Report.getInfoActives(start, end);
    const inactiveUsers = Report.getInfoInactives(start, end);
    const departments = Report.getAllDepartments();
    // fecha inicial del año
    const startYear = new Date(now.getFullYear(), 0, 1)
        .toISOString()
        .split("T")[0];
    // fecha final del año
    const endYear = new Date(now.getFullYear(), 11, 31)
        .toISOString()
        .split("T")[0];
    // cantidad de empleados activos e inactivos por mes del año actual
    const activesPerMonth = Report.getActivesPerMonth(startYear, endYear);
    const inactivesPerMonth = Report.getInactivesPerMonth(startYear, endYear);
    // recibir las promesas de todas las consultas
    Promise.all([
        activeUsers,
        inactiveUsers,
        departments,
        activesPerMonth,
        inactivesPerMonth,
    ])
        .then(
            ([
                [activeUsers],
                [inactiveUsers],
                [departments],
                [activesPerMonth],
                [inactivesPerMonth],
            ]) => {
                response.render("oneOnOne", {
                    ...sessionVars(request),
                    activeUsers: activeUsers,
                    inactiveUsers: inactiveUsers,
                    departments: departments,
                    activesPerMonth: activesPerMonth,
                    inactivesPerMonth: inactivesPerMonth,
                    activeSize: activeUsers.length,
                    inactiveSize: inactiveUsers.length,
                    currentMonthStart: start,
                    currentMonthEnd: end,
                });
            }
        )
        .catch((err) => {
            console.error(err);
            next(err);
        });
};
