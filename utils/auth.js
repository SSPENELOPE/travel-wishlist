const jwt = require('jsonwebtoken');

function loggedIn(req) {
    const token = req.cookies.token;

    if (!token) {
        return false;
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, 'your-secret-key');

        if(decoded) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

module.exports = {
    loggedIn,
};