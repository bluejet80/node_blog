const router = require("express").Router();
const userController = require("../controllers/userController");

const adminLayout = "../views/layouts/admin";

const locals = {
  title: "Admin Pages",
  description: "Blog mand with Nodejs and Express and EJS and MongoDB.",
  author: "Jarett Young",
};

// Render Static Login Page
router.get("/", (req, res) => {
  res.render("admin/login", { locals, layout: adminLayout });
});

// render Static Signup Page
router.get("/register", (req, res) => {
  res.render("admin/register", { locals, layout: adminLayout });
});

router.post("/login", userController.userLogin);

router.post("/signup", userController.userSignup);

router.get("/dashboard", (req, res) => {
  const user = req.session.user;
  res.render("admin/dashboard", { locals, layout: adminLayout, user });
});

module.exports = router;
