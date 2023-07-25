const { error } = require("console");

function checkAuth(req, res, next) {
    if (req.session.user) {
        // if user is authenticated, proceeds to next middleware or route handler
        next();
    } else {
        // if user is not authenticated, redirect to login page
        res.redirect('/auth/login');
    }

    // Call the CheckIdleState middleware
    checkIdleState(req, res, next);
}

function checkIdleState(req, res, next) {
    const idleTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds

    const lastRequestTime = req.session.lastRequestTime || 0;
    const currentTime = Date.now();

    // If the user has been idle longer than the allowed idle timeout, log them out
    if (currentTime - lastRequestTime > idleTimeout) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error logging out', err);
                return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
            }

            return res.redirect('/auth/login');
        }
        );
    } else {
        // If the user has been active, record the time of their last interaction.
        req.session.lastRequestTime = currentTime;
        next();
    }
}



module.exports = {
    checkAuth,
    checkIdleState,
};