require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./server/config/db");

//require routes
const mainRoute = require("./server/routes/main");
const adminRoute = require("./server/routes/admin");

const app = express();

const PORT = process.env.PORT || 5000;

// Connect to DB

connectDB();

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Templating Engine

app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// static files

app.use(express.static("public"));

// mount the route

app.use("/", mainRoute);
app.use("/admin", adminRoute);

// run server

app.listen(PORT, () => {
  console.log(`Server is Listening on port ${PORT}`);
});
