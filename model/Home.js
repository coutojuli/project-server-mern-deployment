const mongoose = require('mongoose');

//schema
const HomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model('Home', HomeSchema);
