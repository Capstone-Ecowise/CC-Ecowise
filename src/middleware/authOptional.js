const jwt = require("jsonwebtoken");

const authOptional = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    try {
      const decodedToken = jwt.verify(
        token.split(" ")[1],
        process.env.SECRET_KEY
      );

      if (decodedToken && decodedToken.username) {
        req.decodedToken = decodedToken;
      }
    } catch (err) {

    }
  }

  next();
};

module.exports = authOptional;
