const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    required: [true, "Please Confirm your Password!"],
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

// Presave Middleware

// update the passwordChangedAt field only if the passowrd was changed
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; //ensure that the token is created after the password change

  next();
});

//encrypting the password
userSchema.pre("save", async function (next) {
  //only run this function if password was created or modified
  if (!this.isModified("password")) return next();
  // hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete the passwordConfirm
  this.confirmPassword = undefined;

  next();
});

// Instance Methods

// Check if Password is Correct
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  //return true or false
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Check if password has been changed
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

module.exports = mongoose.model("User", userSchema);
