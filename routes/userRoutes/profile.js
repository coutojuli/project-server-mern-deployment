const express = require('express');
const routes = express.Router();
const middle = require('../../middleware/verifyToken');
const User = require('./../../model/UserSchema');



routes.get('/profile',middle,async (req,res) =>
{
    const { _id } = req.user;
    const userObject =  await User.findById({_id})

    if(userObject)
    {
            // Gets the User Id and from that user Id we can get info
            res.json({message:userObject});
    }else
    {
            res.json({message:"Unable to Retrive Data"});
    }
});

routes.get('/profile/account',middle, async(req,res) =>
{
    const { _id } = req.user;
    const userObject =  await User.findById({_id})

    if(userObject)
    {
            // Gets the User Id and from that user Id we can get info
            res.json({message:userObject});
    }else
    {
            res.json({message:"Unable to Retrive Data"});
    }
})

routes.get('/profile/account/security',middle, async(req,res) =>
{
    const { _id } = req.user;
    const userObject =  await User.findById({_id})

    if(userObject)
    {
            // Gets the User Id and from that user Id we can get info
            res.json({message:userObject});
    }else
    {
            res.json({message:"Unable to Retrive Data"});
    }
})





module.exports = routes;
