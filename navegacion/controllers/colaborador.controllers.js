exports.get_kpis = (request, response, next) => {
  response.render("kpis");
};

exports.get_absence = (request, response, next) => {
  response.render("absence");
};

exports.get_vacation = (request, response, next) => {
  response.render("vacation");
};

exports.get_onetoOne = (request, response, next) => {
  response.render("oneonone");
};

exports.get_calendar = (request, response, next) => {
  response.render("calendario");
};

exports.get_myprofile = (request, response, next) => {
  response.render("myprofile");
};

exports.get_moreinformation = (request, response, next) => {
  response.render("moreinfoc");
};

exports.get_administrativeoffenses = (request, response, next) => {
  response.render("administrativeoffenses");
};

exports.get_root = (request, response, next) => {
  response.render("inicio");
};
