const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.headers("authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token is empty",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
    } catch (error) {
      return res.status(400).json({
        error: error.message,
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "something went wrong, while validating the token",
    });
  }
};
