
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeFName: {
    type: String,
    required: true,
  },
  employeeLName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true
  },
  phone:{
    type:String,
    min:10,
    max:11,
    required:true,
    },
    gender:{
    type:String,
    required:true
    },
    address:{
    type:String,
    min:5,
    max:40
    },
    status:{
        type: String,
        required : true
    },
    joiningDate:{
        type : Date,
        default : Date.now,
        required: true
    },
    leavingDate:{
        type : Date,
        default : null
    }

});

module.exports = mongoose.model('Employee', EmployeeSchema);