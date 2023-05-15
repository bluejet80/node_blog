const express = require("express");

const router = express.Router();

const locals = {
  title: "NodeJS Blog",
  description: "Blog mand with Nodejs and Express and EJS and MongoDB.",
  author: "Jarett Young",
};

// Routes
router.get("", (req, res) => {
  res.render("index", locals);
});

// Routes
router.get("/about", (req, res) => {
  res.render("about", locals);
});

module.exports = router;
