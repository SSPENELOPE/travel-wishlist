const router = require('express').Router();
const authenticateToken = require('../../middleware/tokenDecode');
const User = require('../../models/user');

// Add a destination
router.post('/addDestination', authenticateToken, async (req, res) => {
    try {
        const { name, location, photo, description } = req.body;

        const userId = req.user.userId;
        console.log('User ID:', userId);
        
        const newDestination = {
            name,
            location,
            photo,
            description,
        };

        // Find the user and push the newDestination into the destinations array
        const user = await User.findById(userId);
        user.destinations.push(newDestination);
        await user.save();
        
        console.log('Saved Destination:', newDestination);
        
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
router.delete('/removeDestination/:index', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { index } = req.params;

        const userWithDestinations = await User.findById(userId);

        const destinations = userWithDestinations.destinations;

        // Use splice to remove the destination at the specified index
        destinations.splice(index, 1);

        await userWithDestinations.save();

        return res.status(200).json({ message: 'Destination deleted successfully' });
    } catch (error) {
        console.error('Error deleting destination:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;