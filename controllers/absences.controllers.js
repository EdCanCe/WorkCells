const Absence = require('../models/absence.model');

exports.get_check = (request, response, next) => {
  response.render("absence_check");
};

exports.get_aprove = (request, response, next) => {
  response.render("absence_aprove");
};

exports.get_add = (request, response, next) => {
  console.log(request.session.mail);
  Absence.fetchAll()
    .then(([absences, fieldData]) => {
      response.render("absences_add", {
        csrfToken: request.csrfToken(),
        absences: absences
      });
    })
    .catch((err) => {
      console.log(err)
    });
  
};

exports.post_add = (req, res, next) => {
  
};

exports.get_root = (request, response, next) => {
  response.render("absences");
};
