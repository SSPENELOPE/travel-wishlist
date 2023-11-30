const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({ 
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    name: String,
    location: String,
    photo: String,
    description: String,
});

module.exports = mongoose.model('Destination', destinationSchema);