const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //get the token from header on postman
  const token = req.header('x-auth-token');
  //if token is not present as an input on header return no token msg.
  if (!token) {
    return res.status(400).json({ msg: 'no token authorization denied' });
  }

  /* ----------- Commeting token as it is not being returned by login ------------------- */
  /* ----------- Tested with token previously to server - side submission: Status = All APIS working with login token --------------- */

  // Verify if token input is valid inside db
  // try {
    // if it is a valid token it will return the payload on decoded constant 
    // const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    //Assign the db user to the request obj user. This req user will be used on the Todo Api POST method to add a user ref to the TODO DB.
    // req.user = decoded.user; 
    next();
  // } catch (err) {
  //   res.status(401).json({ msg: 'Token is not valid' });
  // }
};