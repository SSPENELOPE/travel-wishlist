const router = require('express').Router();
const User = require('../../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    console.log("signup called")
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists, please log in!' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user instance with the hashed password
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();
        console.log("User saved to DB");

        return res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If the credentials are valid, generate a JWT
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
            expiresIn: '1h', // Token expiration time
        });

        // Set the token in the response cookies
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
            secure: true, // Enable in production with HTTPS
        });

        // Send a success message
        return res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');

    return res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;