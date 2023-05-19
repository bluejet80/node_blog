require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectDB = require("./server/config/db");

//require routes
const mainRoute = require("./server/routes/mainRoutes");
const adminRoute = require("./server/routes/adminRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Connect to DB

connectDB();

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
    cookie: { maxAge: new Date(Date.now() + 3600000) },
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

// run server

app.listen(PORT, () => {
  console.log(`Server is Listening on port ${PORT}`);
});
