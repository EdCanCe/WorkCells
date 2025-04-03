const sessionVars = require('../util/sessionVars');

exports.getHomepage = (request, response, next) => {
    response.render('homepage', {
        ...sessionVars(request),
    });
};

exports.getLogout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
}