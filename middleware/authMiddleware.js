function checkAuth(req, res, next) {
    if (req.session.user) {
        // if user is authenticated, proceeds to next middleware or route handler
        next();
    } else {
        // if user is not authenticated, redirect to login page
        res.redirect('/auth/login');
    }
}

module.exports = {
    checkAuth,
};