require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const morgan = require("morgan");

//require routes
const mainRoute = require("./routes/mainRoutes");
const adminRoute = require("./routes/adminRoutes");

const app = express();

// Dev Logging
app.use(morgan("dev"));

// Middleware

// enable req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "keybord cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: { maxAge: 3600000 },
  })
);

// Templating Engine

app.use(expressLayouts);

//establish the layout root
app.set("layout", "./layouts/main");

//identify the view engine
app.set("view engine", "ejs");

// static files

app.use(express.static("public"));

// mount the routes

app.use("/", mainRoute);
app.use("/admin", adminRoute);

// handle all unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handeling Middleware
app.use(globalErrorHandler);

// run server

module.exports = app;
