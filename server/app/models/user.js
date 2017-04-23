const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: Boolean,
    location: String,
    created_at: Date,
    updated_at: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;
