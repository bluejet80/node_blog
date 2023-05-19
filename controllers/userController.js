const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const locals = {
  title: "Admin Pages",
  description: "Blog mand with Nodejs and Express and EJS and MongoDB.",
  author: "Jarett Young",
};

const signToken = (id) => {};

const createSendToken = (user, statusCode, res) => {};

exports.userLogin = async (req, res) => {
  try {
    const { username, passowrd } = req.body;
  } catch (err) {
    console.log(err);
  }
};

exports.userSignup = async (req, res) => {
  try {
    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
      });
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
