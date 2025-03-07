exports.get_check_department = (request, response, next) => {
  response.render('checkdepartment');
};

exports.get_check_profile = (request, response, next) => {
  response.render('checkprofile');
};

exports.get_check_kpis = (request, response, next) => {
  response.render('checkkpis');
};

exports.get_colab_absences = (request, response, next) => {
  response.render('colabAbsences.ejs')
};

exports.get_colab_vacations = (request, response, next) => {
  response.render('solicitudvacaciones');
};
