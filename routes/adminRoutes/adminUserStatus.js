const express = require('express');
const routes = express.Router();
const User = require('../../model/UserSchema');
const middle = require ('./../../middleware/verifyToken');

routes.post('/status', middle,async (req,res)=>{

    const {email} =req.body;

    console.log(email)

    if(!email)
    {  req.status(422).send("Email is requried"); }

   const userDetails  = await User.findOne({email});

   if(!userDetails)
   {  return res.status(400).send('Email does not match with records. Try again.');  }

   return res.send("email:"+ userDetails.email +",status:"+userDetails.status +",name:"+userDetails.name);

   

    // User.find({}, function(err, users) {
    //     var userMap = {};
    
    //     users.forEach(function(user) {
    //       // userMap[user._id] = user;
    //       console.log(user.email + " _" + user.answer + "_" + user.status)
    //     });
    
    //     // res.send(userMap);  
      // });
});


module.exports = routes;