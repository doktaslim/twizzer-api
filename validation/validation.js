const User = require("../models/Users");

const emailValidation = async (email) => {
  let user = await User.findOne({ email });
  if (user) {
    return true;
  } else {
    return false;
  }
};

const userNameValidation = async (username) => {
  let user = await User.findOne({ username });
  if (user) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  emailValidation,
  userNameValidation,
};
