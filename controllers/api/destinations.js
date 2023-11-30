const router = require('express').Router();
const Destination = require('../../models/destination');

// Get all saved destinations
router.get('/destinations', async (req, res) => {
    try {
        // Use Mongoose's find method to retrieve all destinations
        const allDestinations = await Destination.find();

        return res.json(allDestinations);
    } catch (error) {
        console.error('Error getting destinations:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a destination
router.post('/addDestination', async (req, res) => {
    try {
        const { name, location, photo, description } = req.body;

        const newDestination = new Destination({
            name,
            location,
            photo,
            description,
        });

        await newDestination.save();

        res.status(201).json({ message: 'Destination added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a destination
router.put('/updateDestination/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, photo, description } = req.body;

        // Use Mongoose's findByIdAndUpdate to update the destination by ID
        const updatedDestination = await Destination.findByIdAndUpdate(
            id,
            { name, location, photo, description },
            { new: true } // Returns the updated document
        );

        if (!updatedDestination) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        return res.status(200).json({ message: 'Destination updated successfully', destination: updatedDestination });
    } catch (error) {
        console.error('Error updating destination:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a destination
router.delete('/removeDestination/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Use Mongoose's findByIdAndDelete to remove the destination by ID
        const deletedDestination = await Destination.findByIdAndDelete(id);

        if (!deletedDestination) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        return res.status(200).json({ message: 'Destination deleted successfully' });
    } catch (error) {
        console.error('Error deleting destination:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;