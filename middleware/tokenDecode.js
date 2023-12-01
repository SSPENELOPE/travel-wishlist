const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Get the token from the request headers or cookies, depending on your setup
    const token = req.headers.authorization || req.cookies.token;
    if(token) {
        try {
            // Verify the token and attach the user information to the request
            const decoded = jwt.verify(token, 'your-secret-key');
            req.user = decoded;
    
            next(); // Call the next middleware or route handler
        } catch (error) {
            return res.status(403).json({ error: 'Invalid token' });
        }
    } else {
        req.user = {};
        next();
    }
};

module.exports = authenticateToken;