const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new mongoose.Schema({
    name: String,
    location: String,
    photo: String,
    description: String,
});

const userSchema = new mongoose.Schema({
    id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    username: String,
    email: String,
    password: String,
    destinations: [destinationSchema],  // Embed the destinationSchema directly
});

module.exports = mongoose.model('User', userSchema);