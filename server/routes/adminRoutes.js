const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const adminLayout = "../views/layouts/admin";

const locals = {
  title: "Admin Pages",
  description: "Blog mand with Nodejs and Express and EJS and MongoDB.",
  author: "Jarett Young",
};

// Render Static Login Page
router.get("/", async (req, res) => {
  try {
    res.render("admin/login", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

// render Static Signup Page
router.get("/register", async (req, res) => {
  try {
    res.render("admin/register", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", userController.userLogin);

router.post("/register", userController.userSignup);

module.exports = router;
