const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema(
{
    name: String,
    location: String,
    photo: String,
    description: String,
},
{
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false,
}
);

module.exports = mongoose.model('Destination', destinationSchema);