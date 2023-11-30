function loggedIn(req) {
    return req.cookies.token;
}

module.exports = {
    loggedIn,
};