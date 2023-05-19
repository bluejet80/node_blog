const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please input a Username!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an Email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a Valid Email Address."],
  },
  password: {
    type: String,
    required: [true, "You must enter a Password!"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please Confirm your Passowrd!"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

module.exports = mongoose.model("User", userSchema);
