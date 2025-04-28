module.exports = (request, response, next) => {
    if (!(request.session.isLoggedIn || request.isAuthenticated())) {
        return response.redirect("/login");
    }
    const exemptRoutes = ["/employee/me/changePassword", "/logout"];
    if (request.session.passwdFlag === 0 && !exemptRoutes.includes(request.originalUrl)) {
        return response.redirect("/employee/me/changePassword");
    }
    next();
};
