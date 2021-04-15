const mongoose = require('mongoose');

const SalarySlipSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  totalSalary:{
    type : Number,
    required:true
  },
  hourlyWage:{
    type : Number,
    required:true
  },
  takeHomeSalary:{
      type : Number,
      required:true
  },
  totalTaxesPaid:{
      type :Number,
      required: true
  },
  cppContribution:{
    type: Number,
    required: true
  },
  eiContribution:{
      type : Number,
      required: true
  }
});

module.exports = mongoose.model('SalarySlip', SalarySlipSchema);
