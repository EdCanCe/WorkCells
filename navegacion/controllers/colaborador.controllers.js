exports.get_kpis = (require, response, next) => {
  response.send("kpis");
};

exports.get_absence = (require, response, next) => {
  response.send("Ausencias");
};

exports.get_vacation = (require, response, next) => {
  response.send("vacaciones");
};

exports.get_onetoOne = (require, response, next) => {
  response.send("oneonone");
};

exports.get_calendar = (request, response, next) => {
  response.send("calendario");
};

exports.get_myprofile = (require, response, next) => {
  response.send("mi perfil");
};
