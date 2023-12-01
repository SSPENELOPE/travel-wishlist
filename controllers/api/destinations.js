const router = require('express').Router();
const authenticateToken = require('../../middleware/tokenDecode');
const User = require('../../models/user');
const imageHandler = require('../../utils/imageHandler');
const Destination = require('../../models/desitnations');

// Add a destination
router.post('/addDestination', authenticateToken, async (req, res) => {
    try {
        let { name, location, photo, description } = req.body;

        const userId = req.user.userId;

        // If photo is empty, fetch a random image using your imageHandler
        if (photo === '') {
            photo = await imageHandler.getRandomImage(name);
        }

        // Create a new destination document
        const newDestination = new Destination({
            name,
            location,
            photo,
            description,
        });

        // Save the new destination to the destinations collection
        const savedDestination = await newDestination.save();

        // Find the user and push the ObjectId reference to the new destination into the destinations array
        const user = await User.findById(userId);
        user.destinations.push(savedDestination._id);

        // Save the user to update the destinations array
        await user.save();

        res.status(201).json({ message: 'Destination added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a destination
router.put('/updateDestination/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, photo, description } = req.body;

        // Find the destination by ID
        const destination = await Destination.findById(id);

        // Check if the destination exists
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        // Update the destination fields
        destination.name = name || destination.name;
        destination.location = location || destination.location;
        destination.photo = photo || destination.photo;
        destination.description = description || destination.description;

        // Save the updated destination
        await destination.save();

        return res.status(200).json({ message: 'Destination updated successfully' });
    } catch (error) {
        console.error('Error updating destination:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a destination
router.delete('/removeDestination/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        // Find the destination by ID
        const destination = await Destination.findById(id);

        // Check if the destination exists
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        // Remove the destination from the database
        await Destination.findOneAndDelete(id);

        const user = await User.findById(userId);
        user.destinations.pull(id);
        await user.save();

        return res.status(200).json({ message: 'Destination deleted successfully' });
    } catch (error) {
        console.error('Error deleting destination:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;