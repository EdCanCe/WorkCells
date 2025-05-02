const sessionVars = require('../util/sessionVars');
const title = 'Home';

exports.getHomepage = (request, response, next) => {
    response.render('homepage', {
        ...sessionVars(request, title),
    });
};

exports.getLogout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
}