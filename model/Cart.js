const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  items: [{
    id : String,
    item: String,
    quantity: String,
    price : String,
  }],
  totalPrice: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Cart', CartSchema);
