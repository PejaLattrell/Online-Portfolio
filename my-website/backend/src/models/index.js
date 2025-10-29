// This file defines the data models used in the application, typically interacting with a database.

const mongoose = require('mongoose');

// Example schema for a User model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the User model
const User = mongoose.model('User', userSchema);

module.exports = {
    User
};