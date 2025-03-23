exports.get_add = (request, response, next) => {
  response.render("add_faults");
};

exports.get_check = (request, response, next) => {
  response.render("check_fault");
};

exports.get_root = (request, response, next) => {
  response.render("faults");
};
