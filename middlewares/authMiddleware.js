const JWT = require("jsonwebtoken");

//Token Based Authentication
const JWT_SECRET = process.env.JWT_SECRET;
const requireSignIn = async (req, res, next) => {
  try {
    const decodedUser = JWT.verify(req.headers.authorization, JWT_SECRET);
    req.user = decodedUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).send({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = { requireSignIn };
