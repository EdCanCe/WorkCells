const Report = require("../models/report.model");
const sessionVars = require('../util/sessionVars');

exports.getRoot = (request, response, next) => {
    response.render("reportsMenu", {
        ...sessionVars(request),
    });
};

exports.getEmployeeRotation = (request, response, next) => {
    const now = new Date();

    let start = new Date(now.getFullYear(), now.getMonth(), 1);
    start = start.toISOString().split("T")[0];

    let end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    end = end.toISOString().split("T")[0];

    Report.getInfoActives(start, end)
        .then(([activeUsers]) => {
            return Report.getInfoInactives(start, end).then(
                ([inactiveUsers]) => {
                    return Report.getAllDepartments().then(([departments]) => {
                        // console.log(departments);
                        // console.log(activeUsers.length);
                        // console.log(inactiveUsers.length);
                        response.render("reportRotation", {
                            ...sessionVars(request),
                            activeUsers: activeUsers,
                            inactiveUsers: inactiveUsers,
                            departments: departments,
                            activeSize: activeUsers.length,
                            inactiveSize: inactiveUsers.length,
                        });
                    });
                }
            );
        })
        .catch((err) => {
            console.log(err);
        });
};
