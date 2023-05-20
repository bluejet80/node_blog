const Post = require("../models/postModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const locals = {
  title: "NodeJS Blog",
  description: "Blog mand with Nodejs and Express and EJS and MongoDB.",
  author: "Jarett Young",
};

exports.getAllPosts = catchAsync(async (req, res, next) => {
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
});

exports.getSinglePost = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await Post.findById({ _id: id });

  if (!data) {
    next(new AppError("That Post ID is invalid!", 404));
  }

  res.render("post", { locals, data });
});

exports.searchPosts = catchAsync(async (req, res, next) => {
  let searchTerm = req.body.searchTerm;
  // remove any special characters
  searchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

  const data = await Post.find({
    $or: [
      { title: { $regex: new RegExp(searchTerm, "i") } },
      { body: { $regex: new RegExp(searchTerm, "i") } },
    ],
  });

  if (data.length === 0) {
    return next(
      new AppError("Search returned No Results! Please Try Again.", 444)
    );
  } else {
    res.render("search", { locals, data });
  }
});
