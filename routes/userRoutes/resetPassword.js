const express = require('express');
const routes = express.Router();
const User = require('./../../model/UserSchema');
const { validationPasswordReset } = require('../../validations/validate');
const bcrypt = require('bcryptjs');

routes.post('/reset-password', async ( req, res ) =>{
    
    const { email, question,answer ,password } =  req.body;
  
    // Validation
    const {error} = validationPasswordReset(req.body);
        if(error)
            { return res.status(404).json({message:error.details[0].message});}

    try {        
        // Getting the Email    
        const userDetails = await User.findOne({email:email});

        // Email does not exist
        if(!userDetails){
            return res.status(404).json({message:'Wrong Credentials'});
        }

        // Matching the Security Answer
        if( question === userDetails.question && answer === userDetails.answer)
        {
            // Hash the New password
            const hashedPassword = await bcrypt.hash(password,12);

            userDetails.name     = userDetails.name,
            userDetails.email    = email,
            userDetails.phone    = userDetails.phone,
            userDetails.gender   = userDetails.gender,
            userDetails.password = hashedPassword,
            userDetails.cpassword= hashedPassword,
            userDetails.question = question,
            userDetails.answer   = answer

            try{
                await userDetails.save();       
                res.status(200).json({message:'Password is updated. Login with new password'});    
            }catch(err)
            { res.status(400).json({message:err.message});}

        }else
        {
            res.status(400).json({message:'Wrong Credentials. Try Again'});
        }
    } catch (err)
    { res.json({message:err.message});}
});


module.exports = routes;