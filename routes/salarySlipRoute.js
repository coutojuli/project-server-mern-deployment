const express = require('express');
const routes = express.Router();
const auth = require('../middleware/auth');
const employee = require('../model/Employee');
const SalarySlip = require('../model/SalarySlip');
const middle = require('./../middleware/verifyToken');
const { check, validationResult } = require('express-validator');
const { isAuthConnectionResponse } = require('ionic');


routes.get('/salarySlip',middle, async(req,res) =>
{
    const { _id } = req.user;
    

   const abc = await  employee.findById(_id);
   res.send(abc);

    // Gets the User Id and from that user Id we can get info
    res.send(req.user);
})
routes.post(
    '/salarySlip',
    isAuthConnectionResponse,
    [
      check('totalSalary', 'the total salary is required').not().isEmpty(),
      check('hourlyWage', 'the hourly wage is required').not().isEmpty(),
      check('takeHomeSalary', 'the Take home salary is required').not().isEmpty(),
      check('taxPaid', 'tax paid is required').not().isEmpty()
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        const newSalarySlip = new SalarySlip({
            employeeId : req.body.employeeId,
            totalSalary : req.body.totalSalary,
            
        });
        const newEmployee = new Employee({
            employeeFName : req.body.employeeFName,
            employeeLName : req.body.employeeLName,
            designation : req.body.designation,
            phone : req.body.phone,
            gender : req.body.gender,
            address : req.body.address,
            status : "toBeApproved",
            
            leavingDate : null
        });
        

      const result = await newEmployee.save();

      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

module.exports = routes;
