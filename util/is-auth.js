module.exports = (request, response, next) => {
    if (!(request.session.isLoggedIn || request.isAuthenticated())) {
        return response.redirect("/login");
    }
    next();
};
