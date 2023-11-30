const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    username: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('Destination', userSchema);