const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  //if the token is  valid it will be decoded using the private key
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    //we handle to the next middlewarefunction
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
