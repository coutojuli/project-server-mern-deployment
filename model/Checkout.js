const mongoose = require('mongoose');

//schema
const CheckoutSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
    }
});

module.exports = mongoose.model('Checkout', CheckoutSchema);
