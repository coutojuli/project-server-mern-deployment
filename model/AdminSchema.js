const { string } = require('@hapi/joi');
const moongoose = require('mongoose');

const schema = moongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            min:3,
            max:15
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phone:{
            type:String,
            min:10,
            max:11,
            required:true,
        },
        gender:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
            min:6
        },
        cpassword:{
            type:String,
            required:true,
            min:6
        },
        business:{
            type:String,
            required:true,
        },
        createdDate:{
            type:Date,
            default: Date.now
        },
        address:{
            type:String,
            min:5,
            max:40
        }
        
    });

    const Admin = moongoose.model('Admin',schema);

    module.exports = Admin;