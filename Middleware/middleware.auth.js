const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
   jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (decoded) {
        const userID = decoded.userID;
        console.log(decoded)
        req.body.userID = userID;
        next();
      } else {
        res.send("You are not Authorized");
      }
    });
  } else {
    res.send("You are not Authorized");
  }
};

module.exports = {
  authenticate,
};
