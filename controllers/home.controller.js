exports.getHomepage = (request, response, next) => {
    response.render('homepage');
};

exports.getLogout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
}