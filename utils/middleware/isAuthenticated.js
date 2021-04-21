require("dotenv").config();

const jwt = require("express-jwt");

// We are assuming that the JWT will come in the header Authorization but it could come in the req.body or in a query param, you have to decide what works best for you.
const getTokenFromHeader = (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
};

module.exports = jwt({
  secret: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // Has to be the same that we used to sign the JWT

  userProperty: "token", // this is where the next middleware can find the encoded data generated in services/auth:generateToken -> 'req.token'

  getToken: getTokenFromHeader, // A function to get the auth token from the request
  algorithms: ["RS256"],
});
