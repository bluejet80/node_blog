require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

//require routes
const mainRoute = require("./server/routes/main");

const app = express();

const PORT = process.env.PORT || 5000;

// Templating Engine

app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// static files

app.use(express.static("public"));

// mount the route

app.use("/", mainRoute);

// run server

app.listen(PORT, () => {
  console.log(`Server is Listening on port ${PORT}`);
});
