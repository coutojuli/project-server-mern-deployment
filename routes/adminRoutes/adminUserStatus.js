const express = require('express');
const routes = express.Router();
const User = require('../../model/UserSchema');
const middle = require ('./../../middleware/verifyToken');

routes.post('/status', middle,async (req,res)=>{

    const {email} =req.body;

    if(!email)
    {  req.status(422).json({message : "Email is requried"}); }

   const userDetails  = await User.findOne({email});

   if(!userDetails)
   {  return res.status(400).json({message : 'Email does not match with records. Try again.'});  }

   return res.json({message : "Results found",info: "email:"+ userDetails.email +",status:"+userDetails.status +",name:"+userDetails.name});

   

    // User.find({}, function(err, users) {
    //     var userMap = {};
    
    //     users.forEach(function(user) {
    //       // userMap[user._id] = user;
    //       console.log(user.email + " _" + user.answer + "_" + user.status)
    //     });
    
    //     // res.json({message : userMap);  
      // });
});


module.exports = routes;