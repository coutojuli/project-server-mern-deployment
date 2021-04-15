const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

let Employee = require('../model/Employee');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) {
      return res.status(404).send('Employee not found');
    }
    res.send(emp);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post(
  '/',
  auth,
  [
    check('employeeFName', 'the employee first name is required').not().isEmpty(),
    check('employeeLName', 'the employee last name is required').not().isEmpty(),
    check('designation', 'the employee designation is required').not().isEmpty(),
    check('phone', 'phone number is required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
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

router.delete('/', async (req, res) => {
  try {
    const emp = await Employee.findById(req.body.id);
    if (!emp) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    const result = await Employee.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', async (req, res) => {
  try {
    const emp = await Employee.findById(req.body.id);
    if (!emp) {
      return res.status(404).json({ msg: 'employee not found' });
    }

    emp.employeeFName = req.body.employeeFName,
    emp.employeeLName = req.body.employeeLName,
    emp.designation = req.body.designation,
    emp.phone = req.body.phone,
    emp.gender = req.body.gender,
    emp.address = req.body.address,
    emp.status = "toBeApproved",
    emp.joiningDate = Date.now,
    emp.leavingDate = null
    
    await emp.save();
    res.send(emp);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;