const express = require('express');
const routes = express.Router();
const Admin = require('../../model/AdminSchema');
const { validationAdminPasswordReset } = require('../../validations/validate');
const bcrypt = require('bcryptjs');

routes.post('/reset-password', async ( req, res ) =>{
    
    const { email, business ,password } =  req.body;
  
    // Validation
    const {error} = validationAdminPasswordReset(req.body);
        if(error)
            { return res.status(404).json({message:error.details[0].message});}

    try {        
        // Getting the Email    
        const adminDetails = await Admin.findOne({email:email});

        // Email does not exist
        if(!adminDetails){
            return res.status(404).json({message:'Invalid Credentials'});
        }

        // Matching the Security Answer
        if( business === adminDetails.business)
        {
            // Hash the New password
            const hashedPassword = await bcrypt.hash(password,12);

            adminDetails.name     = adminDetails.name,
            adminDetails.email    = email,
            adminDetails.phone    = adminDetails.phone,
            adminDetails.gender   = adminDetails.gender,
            adminDetails.password = hashedPassword,
            adminDetails.cpassword= hashedPassword,
            adminDetails.business = business,
            adminDetails.address  = adminDetails.address

            try{
                await adminDetails.save();       
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