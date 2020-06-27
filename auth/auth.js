const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const { SECRET } = require("../config/config");
const {
  userNameValidation,
  emailValidation,
} = require("../validation/validation.js");
const passport = require("passport");

const registerUser = async (userDetails, role, res) => {
  try {
    let emailTaken = await emailValidation(userDetails.email);
    if (emailTaken) {
      return res.status(400).json({
        success: false,
        message: "This email is registered.",
      });
    }
    let userNameTaken = await userNameValidation(userDetails.username);
    if (userNameTaken) {
      return res.status(400).json({
        success: false,
        message: "This username has been taken.",
      });
    }

    const password = await bcrypt.hash(userDetails.password, 10);
    const newUser = new User({
      ...userDetails,
      password,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "You have successfully been registered.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const loginUser = async (userCredentials, role, res) => {
  try {
    const { email, password } = userCredentials;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "This email has not been registered yet.",
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "You do not have the right permission to access this route.",
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password.",
      });
    } else {
      let token = jwt.sign(
        {
          user_id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        SECRET,
        { expiresIn: "7 days" }
      );

      let result = {
        username: user.username,
        role: user.role,
        email: user.email,
        token: `Bearer ${token}`,
      };

      return res.status(200).json({
        success: true,
        message: "Successfully logged in.",
        ...result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const userAuth = passport.authenticate("jwt", { session: false });

const serializeUser = (user) => {
  return {
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
  };
};

const checkRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  });
};

module.exports = {
  registerUser,
  loginUser,
  userAuth,
  serializeUser,
  checkRole,
};
