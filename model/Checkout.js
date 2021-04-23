const mongoose = require('mongoose');

//schema
const CheckoutSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
    },
    cc_no: {
        type: Number,
    },
    cvc: {
        type: Number,
    },
    exp_date: {
        type: String,
    },
});

module.exports = mongoose.model('Checkout', CheckoutSchema);
