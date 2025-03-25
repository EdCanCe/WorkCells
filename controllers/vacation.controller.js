exports.get_vacation = (request, response, next) => {
  response.render("ownVacation");
};

exports.get_approve_vacation = (request, response, next) => {
  response.render("approveVacation");
};

exports.get_add_vacation = (request, response, next) => {
  response.render("addVacation");
};

exports.get_check_vacation = (request, response, next) => {
  response.render("checkVacation");
};

exports.get_modify_vacation = (request, response, next) => {
  response.render("modifyVacation");
};
