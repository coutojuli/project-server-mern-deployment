// Validation dependency
const Joi = require('@hapi/joi');

// Validation Schema for Register
const validationRegister = reqBody => {

    const schema = Joi.object({
        name: Joi.string()
                 .min(3)
                 .max(30)
                 .required(),
        
        email: Joi.string()
                  .required()    
                  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','gov','edu'] } }),
         
        phone: Joi.string()
                  .min(10)
                  .max(10)
                  .required(),    
        
        gender: Joi.string()
                   .required(),    
    
        password: Joi.string()
                     .min(6)
                     .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    
        cpassword: Joi.ref('password'),
        
        question: Joi.string()
                     .max(50)
                     .required(),
        
        answer  : Joi.string()
                     .min(3)
                     .max(20)
                     .required(),

        bio     : Joi.string()
                     .max(100),   

        address : Joi.string()
                     .max(35)   
    });  
    return schema.validate(reqBody);
};

// Validation Schema for Login
const validationLogin = reqBody => {

    const schema = Joi.object({      
        email: Joi.string()
            .required()    
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','gov','edu'] } }),
    
        password: Joi.string()
            .min(6)
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    });  
    return schema.validate(reqBody);
};

// Validation Schema for Reset Password
const validationPasswordReset = reqBody => {

    const schema = Joi.object({      
        email: Joi.string()
                  .required()    
                  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','gov','edu'] } }),
    
        question: Joi.string()
                  .max(50)
                  .required(),
     
        answer  : Joi.string()
                  .min(3)
                  .max(20)
                  .required(),
     
        password: Joi.string()
                     .min(6)
                     .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))             
    });  
    return schema.validate(reqBody);
};

const validationQuestion = reqBody =>{

    const schema = Joi.object({

        question : Joi.string()
                      .min(6)
                      .max(35)
                      .required()  

    });
    return schema.validate(reqBody);
}


// ADMIN PANEL 

// Validation Schema for Admin
const validationAdminRegister = reqBody => {

    const schema = Joi.object({
        name: Joi.string()
                 .min(3)
                 .max(30)
                 .required(),
        
        email: Joi.string()
                  .required()    
                  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','gov','edu'] } }),
         
        phone: Joi.string()
                   .length(10)
                   .pattern(/^[0-9]+$/)
                  .required(),    
        
        gender: Joi.string()
                   .required(),    
    
        password: Joi.string()
                     .min(6)
                     .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    
        cpassword: Joi.ref('password'),
        
        business: Joi.string()
                     .length(9)
                     .required(),

        address : Joi.string()
                     .max(35)   
    });  
    return schema.validate(reqBody);
};

// Validation Schema for Reset Password
const validationAdminPasswordReset = reqBody => {

    const schema = Joi.object({      
        email: Joi.string()
                  .required()    
                  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','gov','edu'] } }),
    
        business: Joi.string()
                  .length(9)
                  .required(),
          
        password: Joi.string()
                     .min(6)
                     .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))             
    });  
    return schema.validate(reqBody);
};

// USER
module.exports.validationRegister = validationRegister;
module.exports.validationLogin = validationLogin;
module.exports.validationPasswordReset = validationPasswordReset;
module.exports.validationQuestion = validationQuestion;

// ADMIN
module.exports.validationAdminRegister = validationAdminRegister;
module.exports.validationAdminPasswordReset = validationAdminPasswordReset;