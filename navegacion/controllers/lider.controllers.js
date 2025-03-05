exports.get_equipo = (require, response, next) => {
  response.send("Equipo");
};

exports.get_kpisC = (require, response, next) => {
  response.send("Kpi de colaborador");
};

exports.get_check = (request, response, next) => {
  response.send("consulta");
};

exports.get_absenceC = (require, response, next) => {
  response.send("Ausencia de colaborador");
};

exports.get_requestV = (require, response, next) => {
  response.send("Respuesta");
};
