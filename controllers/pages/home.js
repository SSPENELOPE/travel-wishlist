const router = require('express').Router();
const path = require('path');
const Destination = require('../../models/destination')
const auth = require('../../utils/auth');

router.get('/', (req, res) => {
    try {
        res.render('home.handlebars', {
            logged_in: auth.loggedIn(req),
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/login', (req, res) => {
    try {
        res.render('login.handlebars')
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error');
    }
});

router.get('/signup', (req, res) => {
    try {
        res.render('signup.handlebars')
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;