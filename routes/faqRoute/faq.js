const express = require("express");
const routes = express.Router();
const middle = require("../../middleware/verifyToken");
const User = require("../../model/UserSchema");
const FAQ = require("../../model/FAQSchema");

const { validationQuestion } = require("../../validations/validate");

routes.post("/faq", middle, async (req, res) => {
  try {
    const { _id } = req.user;

        if (_id) {
                const { question } = req.body;

                // Fetching only name and email using user Id
                const { name , email } = await User.findById(_id);

                // Updating the User question 
                const results = await User.findByIdAndUpdate(
                    { _id: _id },
                    { $addToSet: { faq: { question: question } } }
                );
                if (results) {

                    // Creating a FAQ 
                    const faqDetails =  await new FAQ(); 

                // user name is not present    
                
                    faqDetails.userName = name
                    faqDetails.userEmail = email
                    faqDetails.question = question
                    faqDetails.answer = ""
                    faqDetails.status = false
                
                    try{
                        faqDetails.save();
                        return res.status(200).json({message:"Question Posted" + results});

                    } catch(err)
                    {
                        res.status(400).json({message:err.message});
                    }               
                } else {
                    res.status(400).json({message:results});
                }
            } else {
                res.status(400).json({message:"Login Again"});
                }
         } catch (err) {
            res.status(400).json({message:err.message});
    }
  });

module.exports = routes;
