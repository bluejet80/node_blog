const express = require("express");
const Post = require("../models/post");

const router = express.Router();

const locals = {
  title: "NodeJS Blog",
  description: "Blog mand with Nodejs and Express and EJS and MongoDB.",
  author: "Jarett Young",
};

// Routes

// Home GET
router.get("", async (req, res) => {
  try {
    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const hasPrevPage = page > 1;

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage: hasPrevPage ? page - 1 : null,
    });
  } catch (error) {
    console.log(error);
  }
});

// Post GET

router.get("/post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Post.findById({ _id: id });

    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

// About GET
router.get("/about", (req, res) => {
  res.render("about");
});

// Search POST

router.post("/search", async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    // remove any special characters
    searchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchTerm, "i") } },
        { body: { $regex: new RegExp(searchTerm, "i") } },
      ],
    });

    res.render("search", {
      data,
      locals,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
