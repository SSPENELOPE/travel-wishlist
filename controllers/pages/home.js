const router = require('express').Router();
const path = require('path');
const User = require('../../models/user');
const authenticateToken = require('../../middleware/tokenDecode');

router.get('/', authenticateToken, async (req, res) => {
    try {
        if (req.user.userId) {

            const userId = req.user.userId;
         
            const userWithDestinations = await User.findById(userId);

            // Extract destinations from the user object
            const destinations = userWithDestinations.destinations;

            console.log(destinations);

            return res.render('home.handlebars', {
                logged_in: true,
                user: userWithDestinations.toObject(),  // Pass the user data to the template
                destinations: destinations.toObject()
            });
        } else {
            return res.render('home.handlebars', {
                logged_in: false,
            });
        }

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