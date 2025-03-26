const Report = require("../models/report.model");

exports.getRoot = (request, response, next) => {
    response.render("reportsMenu");
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
                        console.log(departments);
                        response.render("reportRotation", {
                            activeUsers: activeUsers,
                            inactiveUsers: inactiveUsers,
                            departments: departments,
                        });
                    });
                }
            );
        })
        .catch((err) => {
            console.log(err);
        });
};
