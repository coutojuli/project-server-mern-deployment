const moongoose = require('mongoose');
const schema = moongoose.Schema({
        userName:{
            type:String,
        },
        userEmail:{
            type:String,
        },
        question:{
            type:String,
            required:true,
        },
        answer:{
            type:String,
        },
        status:{
            type:Boolean,
        },
    });

const FAQSchema = moongoose.model('faq',schema);

module.exports = FAQSchema;