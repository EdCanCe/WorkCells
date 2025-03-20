

exports.get_add = (request, response, next) => {
  console.log(request.session.username);
  Plantas.fetchAll().then(([plantas, fieldData]) => {
      response.render('add_faults', {
          isLoggedIn: request.session.isLoggedIn || false,
          username: request.session.username || '',
          csrfToken: request.csrfToken(),
          privilegios: request.session.privilegios || [],
          plantas: plantas,
      });
  }).catch((error) => {
      console.log(error);
  });
};

exports.post_add = (request, response, next) => {
  console.log(request.body);
};

exports.get_check = (request, response, next) => {
  response.render("check_fault");
};

exports.get_root = (request, response, next) => {
  response.render("faults");
};
