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
    Report.getActiveIDs(start, end)
        .then(([activesIds]) => {
            if (activesIds) {
                console.log(activesIds);
                return Report.getInfoActives(activesIds);
            }
            return Promise.resolve();
        })
        .then(([activeUsers]) => {
            console.log(activeUsers);
            response.render("reportRotation");
        })
        .catch((err) => {
            console.log(err);
        });
};
