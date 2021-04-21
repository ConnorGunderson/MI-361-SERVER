const {User} = require("../../db");

module.exports = async (req, res, next) => {
  const decodedTokenData = req.token;
  const userRecord = await User.findOne({ email: decodedTokenData.email });
  
  req.currentUser = userRecord;

  if (!userRecord) {
    return res.status(401).end("User not found");
  } else {
    return next();
  }
};
