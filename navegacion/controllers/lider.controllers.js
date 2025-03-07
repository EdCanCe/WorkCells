exports.get_check_department = (request, response, next) => {
  response.render('checkdepartment');
};

exports.get_check_profile = (request, response, next) => {
  response.render('checkprofile');
};

exports.get_check_kpis = (request, response, next) => {
  response.send('kpis');
};

exports.get_colab_absences = (request, response, next) => {
  response.render('colabAbsences.ejs')
};