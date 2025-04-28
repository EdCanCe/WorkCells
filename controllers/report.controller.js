const { start } = require("repl");
const Report = require("../models/report.model");
const sessionVars = require("../util/sessionVars");
const puppeteer = require("puppeteer");
const title = "Reports";

exports.getRoot = (request, response, next) => {
    response.render("reportsMenu", {
        ...sessionVars(request, title),
    });
};

exports.getEmployeeRotation = (request, response, next) => {
    // fecha actual (YYYY-MM-DD:TIME)
    const now = new Date();

    // fecha de inicio del año actual (YYYY-MM-DD)
    const startDate = new Date(now.getFullYear(), 0, 1);
    const start = startDate.toISOString().split("T")[0];

    // fecha actual (YYYY-MM-DD)
    const end = now.toISOString().split("T")[0];

    // información de usuarios activos, inactivos y departamentos
    const activeUsers = Report.getInfoActives(start, end);
    const inactiveUsers = Report.getInfoInactives(start, end);

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

    // cantidad de empleados al inicio
    const startEmployees = Report.getNumerOfEmployees(startDate);

    //cantidad de empleados al final
    const endEmployees = Report.getNumerOfEmployees(now);

    // recibir las promesas de todas las consultas
    Promise.all([
        activeUsers,
        inactiveUsers,
        activesPerMonth,
        inactivesPerMonth,
        startEmployees,
        endEmployees,
    ])
        .then(
            ([
                [activeUsers],
                [inactiveUsers],
                [activesPerMonth],
                [inactivesPerMonth],
                [startEmployees],
                [endEmployees],
            ]) => {
                response.render("reportRotation", {
                    ...sessionVars(request, title),
                    activeUsers: activeUsers,
                    inactiveUsers: inactiveUsers,
                    activesPerMonth: activesPerMonth,
                    inactivesPerMonth: inactivesPerMonth,
                    activeSize: activeUsers.length,
                    inactiveSize: inactiveUsers.length,
                    currentStart: startDate,
                    currentEnd: now,
                    startEmployees: startEmployees[0].total,
                    endEmployees: endEmployees[0].total,
                });
            }
        )
        .catch((err) => {
            console.error(err);
            next(err);
        });
};

exports.getOneonOneDepartment = (request, response, next) => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split("T")[0];
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];
    const departmentID = request.params.departmentID;

    Report.fetchDepartment()
        .then(([departments]) => {
            // Si NO hay departmentID (undefined o cadena vacía) → ALL
            if (!departmentID) {
                return Promise.all([
                    Report.AllAnswerWorkload(),
                    Report.AllAnswerPhysicalHealth(),
                    Report.AllAnswerAcknowledgement(),
                    Report.AllAnswerWorkLifeBalance(),
                    Report.AllAnswerEmotionalHealth(),
                ]).then(
                    ([
                        [workloadRows],
                        [physicalHealthRows],
                        [acknowledgementRows],
                        [workLifeBalanceRows],
                        [emotionalHealthRows],
                    ]) => {
                        // Responder JSON en petición AJAX
                        if (
                            request.xhr ||
                            request.headers.accept.includes("application/json")
                        ) {
                            return response.json({
                                workload: workloadRows,
                                physicalHealth: physicalHealthRows,
                                acknowledgement: acknowledgementRows,
                                workLifeBalance: workLifeBalanceRows,
                                emotionalHealth: emotionalHealthRows,
                                currentMonthStart: start,
                                currentMonthEnd: end,
                            });
                        }
                        // Render normal
                        return response.render("oneOnOne", {
                            ...sessionVars(request, title),
                            departments,
                            selectedDepartmentID: "",
                            workload: workloadRows,
                            physicalHealth: physicalHealthRows,
                            acknowledgement: acknowledgementRows,
                            workLifeBalance: workLifeBalanceRows,
                            emotionalHealth: emotionalHealthRows,
                            currentMonthStart: start,
                            currentMonthEnd: end,
                        });
                    }
                );
            }

            // Si hay un departmentID válido → UNO SOLO
            return Promise.all([
                Report.getAnswerWorkload(departmentID),
                Report.getAnswerPhysicalHealth(departmentID),
                Report.getAnswerAcknowledgement(departmentID),
                Report.getAnswerWorkLifeBalance(departmentID),
                Report.getAnswerEmotionalHealth(departmentID),
            ]).then(
                ([
                    [workloadRows],
                    [physicalHealthRows],
                    [acknowledgementRows],
                    [workLifeBalanceRows],
                    [emotionalHealthRows],
                ]) => {
                    if (
                        request.xhr ||
                        request.headers.accept.includes("application/json")
                    ) {
                        return response.json({
                            workload: workloadRows,
                            physicalHealth: physicalHealthRows,
                            acknowledgement: acknowledgementRows,
                            workLifeBalance: workLifeBalanceRows,
                            emotionalHealth: emotionalHealthRows,
                            currentMonthStart: start,
                            currentMonthEnd: end,
                        });
                    }
                    return response.render("oneOnOne", {
                        ...sessionVars(request, title),
                        departments,
                        selectedDepartmentID: departmentID,
                        workload: workloadRows,
                        physicalHealth: physicalHealthRows,
                        acknowledgement: acknowledgementRows,
                        workLifeBalance: workLifeBalanceRows,
                        emotionalHealth: emotionalHealthRows,
                        currentMonthStart: start,
                        currentMonthEnd: end,
                    });
                }
            );
        })
        .catch((error) => next(error));
};
