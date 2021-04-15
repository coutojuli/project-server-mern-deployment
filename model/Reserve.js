const mongoose = require('mongoose');

//schema

const ReserveSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  stime: {
    type: String,
  },
  etime: {
    type: String,
  },
  tableno: {
    type: String,
  },
});

module.exports = mongoose.model('Reserve', ReserveSchema);