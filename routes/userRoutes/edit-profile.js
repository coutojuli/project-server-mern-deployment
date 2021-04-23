const express = require('express');
const routes = express.Router();
const middle = require('../../middleware/verifyToken');
const User = require('../../model/UserSchema');
const { validationRegister } = require('../../validations/validate');
const bcrypt = require('bcryptjs');


routes.post('/edit-profile',middle, async (req,res) =>{

  try{

    const { _id } = req.user;

            if(_id){        

                const userDetails =  await User.findById(_id);
                if(userDetails) {                        
                    
                        const { name , email , phone, gender, password, cpassword, question, answer,bio,address } = req.body;
        
                        const {error} = validationRegister(req.body);    
                        if(error){
                            return  res.status(422).json({message:error.details[0].message })
                            }

                                // Hash Password 
                                    const hashedPassword = await bcrypt.hash(password,12);
                                    const hashedConfirmPassword = await bcrypt.hash(cpassword,12);

                                        userDetails.name      =  name,
                                        userDetails.email     =  email,
                                        userDetails.phone     =  phone,
                                        userDetails.gender    =  gender,
                                        userDetails.password  =  hashedPassword,
                                        userDetails.cpassword =  hashedConfirmPassword,
                                        userDetails.question  =  question,
                                        userDetails.answer    =  answer,
                                        userDetails.bio       =  bio,
                                        userDetails.address   =  address
                            
                                // Saving updated user in Database

                                try {
                                    userDetails.save();
                                  return  res.status(200).json({message: "Profile updated Succesfully" });                                    
                                } catch (error) {
                                  return  res.status(422).json({message: error.message} );                                                                        
                                }


                      } else{
                          return res.status(422).json({message:"Profile is not updated. Try Again" });
                    }
            }else
                { return  res.status(422).json({message:'Something went wrong. Try Login Again.!'}) };
        }catch(err)
            { return  res.status(422).json({message:err.message}); }


    });

module.exports = routes;
