const jwt = require('jsonwebtoken');


const verifyToken = function(req,res,next) {

    const token = req.header('login-token');
    if(!token)
    { res.status(401).send('Access Denied. Please login to get access'); }

    try {
        const verifiedToken = jwt.verify(token,process.env.SECRET_TOKEN);
        req.user = verifiedToken;
        next();
            
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = verifyToken;