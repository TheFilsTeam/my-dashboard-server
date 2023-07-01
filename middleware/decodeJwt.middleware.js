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
      try {
            let jwtContent = jwt.verify(authorization, process.env.TOKEN_SECRET);
            req.__jwt_content = jwtContent;
            req.__jwt_userId = jwtContent?._id;
            if(req.__jwt_userId) {
              // Fetch the user by id 
              const userMongo = await User.findOne({_id: jwtContent._id});
              // Get real object: https://stackoverflow.com/a/60978177/717372
              const user = userMongo._doc
              delete user.password;
              req.__jwt_user = user;
            }
       } catch(e) {
            console.log("Error try to extract data from jwt:" + e);
      }
  }

  next();
}

module.exports = decodeJwt;