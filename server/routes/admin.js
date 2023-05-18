const express = require("express");
const router = express.Router();
const Post = require("../models/post");

const adminLayout = "../views/layouts/admin";

// GET Admin Login

router.get("/", async (req, res) => {
  try {
    //const data = await Post.findById({ _id: id });

    res.render("login", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
