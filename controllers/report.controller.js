exports.getRoot = (request, response, next) => {
    response.render("reportsMenu");
};

exports.getEmployeeRotation = (request, response, next) => {
    response.render("reportRotation");
};
