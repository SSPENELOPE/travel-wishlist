const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,
        email: String,
        password: String,
        destinations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Destination'
            }
        ], 
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

module.exports = mongoose.model('User', userSchema);