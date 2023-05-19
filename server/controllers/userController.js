const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const locals = {
  title: "Admin Pages",
  description: "Blog mand with Nodejs and Express and EJS and MongoDB.",
  author: "Jarett Young",
};

exports.userLogin = async (req, res) => {
  try {
    const { username, passowrd } = req.body;
  } catch (err) {
    console.log(err);
  }
};

exports.userSignup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({
        status: "success",
        message: "User Created Successfully",
        data: user,
      });
    } catch (err) {
      if (err.code === 11000) {
        res.status(409).json({
          status: "failed",
          message: "Username already in use",
          data: err,
        });
      }
      res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
        data: err,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
