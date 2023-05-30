const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.signUp = async (req, res) => {
  try {
    //data fetch
    const { email, name, password, confirmPassword, age } = req.body;

    //validate data
    if (!email || !name || !password || !confirmPassword || !age) {
      return res.status(400).json({
        success: false,
        message: "please fill all the details",
      });
    }
    //validate user
    const userDetails = await UserModel.findOne({ email });
    if (userDetails) {
      return res.status(400).json({
        success: false,
        message: "user already registered",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password does not match",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a profile
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      age: age,
    });
    return res.status(201).json({
      success: true,
      data: user,
      message: "user is registered successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      success: false,
      message: "user cannot be registered, please try again",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please enter all the details",
      });
    }

    //check user exists or not
    const userDetails = await UserModel.findOne({ email });

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "user does not exist with the given email",
      });
    }

    //match password
    const matchPassword = await bcrypt.compare(password, userDetails.password);
    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: "password does not match",
      });
    }
    //generate jwt
    const payload = {
      email: userDetails.email,
      id: userDetails._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    userDetails.token = token;
    userDetails.password = undefined;
    // let userDetailsObject = userDetails.toObject();

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      userDetails,
      message: "logged in successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      success: false,
      message: "something went wrong, login failure, please try again",
    });
  }
};

//to update age and name
exports.updateProfile = async (req, res) => {
  try {
    //get data
    const { name, age } = req.body;
    //get userId
    const userId = req.param.id;

    //find profile
    const userDetails = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { name: name, age: age },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "user details are updated successfully",
      data: userDetails,
    });
    //return response
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user details cannot be updated, please try again",
      error: error.message,
    });
  }
};
