const sessionVars = require('../util/sessionVars');

exports.getDepartments = (request, response, next) => {
    response.render('checkDepartment', {
        ...sessionVars(request),
    });
}

exports.getAddDepartment = (request, response, next) => {
    response.render('addDepartment', {
        ...sessionVars(request),
    });
};

exports.getCheckDepartment = (request, response, next) => {
    response.render('checkOneDpmt', {
        ...sessionVars(request),
    })
};

exports.postDeleteDeparment = (request, response, next) => {
    console.log(request.session);
}

exports.getModifyDepartment = (request, response, next) => {
    response.render('modifyDepartment', {
        ...sessionVars(request),
        // TODO: Hacer la fokin conexión con la base de datos para obtener el fokin id del departamento
    })
};