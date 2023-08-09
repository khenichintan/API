const mongoose = require('mongoose');

const coachSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cricketer_ids: {
        type: Array,
        ref: 'Cricket',
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const coach = mongoose.model('coach', coachSchema);

module.exports = coach;