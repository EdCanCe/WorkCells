exports.get_dia_feriado = (request, response, next) => {
  response.send('diaferiado');
};

exports.get_solicitud_vacaciones = (request, response, next) => {
  response.send('solicitudvacaciones');
};

exports.get_departments = (request, response, next) => {
  response.render('addDepartment');
};

exports.get_profile = (request, response, next) => {
  response.render('checkprofile.ejs');
};

exports.get_faults = (request, response, next) => {
  response.render('faults');
};

exports.get_colab_absences = (request, response, next) => {
  response.render('colabAbsences.ejs');
};

exports.get_employees = (request, response, next) => {
  response.render('employees.ejs');
}

exports.get_oneOneOne = (request, response, next) => {
  response.render('oneOnOne.ejs');
}