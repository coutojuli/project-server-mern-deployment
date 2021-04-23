const express = require('express');
const routes = express.Router();
const Admin = require('../../model/AdminSchema');
const { validationLogin } = require('../../validations/validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Login User

routes.post('/login',async (req,res) => {
 
try {

        const {email, password} = req.body;

        // Validation check using JOI
        // This return the JSon object, so just getting error from JSON 
        const {error} = validationLogin(req.body);
        if(error)    {
            return res.status(422).json( {message:error.details[0].message});
        }


        const userDetails = await Admin.findOne({email:email});
        // Check If Email exist
        if(!userDetails)
        {   return res.status(400).json({message:'Email or password are invalid'}); }

        // Compare Password if email exist
        const validatePass =   await bcrypt.compare(password,userDetails.password);
        if(!validatePass){
                return res.status(400).json({message:'Email or password does not match'});    }

        // Create and assign a new Token
        const newToken = await jwt.sign({ _id:userDetails._id},process.env.SECRET_TOKEN);
      
        if(!newToken){
            res.status(400).json({message:'Something went wrong. Try again'});
        }

                // Saving the Token to Cookies
                res.cookie("restaurantjwt",newToken,{
                    expires: new Date(Date.now + 25892000),
                    httpOnly:true
                });
        

        res.status(200).json({message:"Login Successfull"});
        // return res.header({'login-token':newToken}).send(newToken);          
    } catch (error) {
        res.status(400).json({messgae:console.log(error)});
        }
});


module.exports = routes;