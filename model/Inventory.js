const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  status:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);
