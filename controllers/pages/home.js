const router = require('express').Router();
const User = require('../../models/user');
const authenticateToken = require('../../middleware/tokenDecode');

router.get('/', authenticateToken, async (req, res) => {
    try {
        if (req.user.userId) {
            const userId = req.user.userId;

            // Use Mongoose's populate to retrieve the destinations data
            const userWithDestinations = await User.findById(userId).populate('destinations');

            // Extract destinations from the user object
            const destinations = userWithDestinations.destinations;

            return res.render('home.handlebars', {
                logged_in: true,
                user: userWithDestinations.toObject(),  // Pass the user data to the template
                destinations: destinations.map(destination => destination.toObject()), // Convert each destination to an object
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

router.get('/login', authenticateToken, (req, res) => {
    try {
        if (req.user.userId) {
            // User is already logged in, redirect to the homepage
            return res.redirect('/');
        }

        // User is not logged in, render the login page
        return res.render('login.handlebars');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

router.get('/signup', authenticateToken, (req, res) => {
    try {
        if (req.user.userId) {
            // User is already logged in, redirect to the homepage
            return res.redirect('/');
        }

        // User is not logged in, render the signup page
        res.render('signup.handlebars')
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;