exports.get_check = (request, response, next) => {
  response.render("absence_check");
};

exports.get_aprove = (request, response, next) => {
  response.render("absence_aprove");
};

exports.get_add = (request, response, next) => {
  response.render("absences_add");
};

exports.get_root = (request, response, next) => {
  response.render("absences");
};
