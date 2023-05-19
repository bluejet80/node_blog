const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

// Routes

// Home GET
router.get("", postController.getAllPosts);

// Post GET

router.get("/post/:id", postController.getSinglePost);

// Renter Static About Page
router.get("/about", (req, res) => {
  res.render("about");
});

// Search POST

router.post("/search", postController.searchPosts);

module.exports = router;
