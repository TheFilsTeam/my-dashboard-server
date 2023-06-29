const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

///Extract data from Jwt token.
///Especially the user ones and put it in:
/// req.__jwt_content <= content of the jwt decoded
/// req.__jwt_userId <= user id
/// req.__jwt_user <= user object retrieved from database
decodeJwt = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization.split(' ')[1];
      let jwtContent;
      try {
            jwtContent = jwt.verify(authorization, process.env.TOKEN_SECRET);
            req.__jwt_content = jwtContent;
            req.__jwt_userId = jwtContent._id;
            // Fetch the user by id 
            const user = await User.findOne({_id: jwtContent._id});
            delete user.password;
            req.__jwt_user = user;
       } catch(e) {
            console.log("Error try to extract data from jwt:" + e);
      }
  }

  next();
}

module.exports = decodeJwt;