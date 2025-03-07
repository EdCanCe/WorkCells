exports.get_dia_feriado = (request, response, next) => {
  response.send('diaferiado');
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