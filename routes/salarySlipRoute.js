const express = require('express');
const routes = express.Router();

const employee = require('../model/Employee');
const middle = require('./../middleware/verifyToken');

routes.get('/salarySlip',middle, async(req,res) =>
{
    const { _id } = req.user;
    

   const abc = await  employee.findById(_id);
   res.send(abc);

    // Gets the User Id and from that user Id we can get info
    res.send(req.user);
})

module.exports = routes;
