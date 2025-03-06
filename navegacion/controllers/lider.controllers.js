exports.get_check_department = (require, response, next) => {
  response.render("checkdepartment");
};

exports.get_check_profile = (require, response, next) => {
  response.render("checkprofile");
};

exports.get_check_kpis = (require, response, next) => {
  response.send("kpis");
};
