

exports.getAdd = (request, response, next) => {
    response.render("employeeAdd");
}

exports.getModify = (request, response, next) => {
    response.render("employeeCheckModify");
}

exports.getCheck = (request, response, next) => {
    response.render("employeeCheck");
}

exports.getMe = (request, response, next) => {
    response.render("employeeMe");
}



exports.getRoot = (request, response, next) => {
    response.render("employee");
}