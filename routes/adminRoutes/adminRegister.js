const express = require('express');
const routes = express.Router();
const Admin = require('../../model/AdminSchema');
const { validationAdminRegister } = require('../../validations/validate');
const bcrypt = require('bcryptjs');

// Register User

routes.post('/register', async (req,res)=>{


    const { name , email , phone, gender, password, cpassword, business, address } = req.body;
    console.log(req.body);

    // Validation check using JOI
    // This return the JSon object, so just getting error from JSON 
        const {error} = validationAdminRegister(req.body);
        
            if(error){
                return res.status(422).json({message: error.details[0].message});
            }


    // Create a new user 
    try {
        // Email already exist
        const emailExist = await Admin.findOne( {email:email} );

        if(emailExist){
        return res.status(400).json({message:'Email already Exist, Try registering with new Email'});
        }

        // Hash Password 
            const hashedPassword = await bcrypt.hash(password,12);
            const hashedConfirmPassword = await bcrypt.hash(cpassword,12);

            const registerUser = await new Admin({
                name     : name,
                email    : email,
                phone    : phone,
                gender   : gender,
                password : hashedPassword,
                cpassword: hashedConfirmPassword,
                business : business,
                address  : address
            });
    
        // Saving user in Database
        if (registerUser) {
          
            try {
                registerUser.save();
                res.status(200).json({message: "Admin Registered Succesfully"});
            }
            catch(err){
                return res.status(422).json({message:err.message});
            }
           } else {
            return res.status(422).json({ message: "Not Registered" });
            }
     } catch (error){ 
            res.status(400).json({message:error.message});
        }
});

module.exports = routes;