require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

const PORT = process.env.PORT || 5000;

// Templating Engine

app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// mount the route

app.use("/", require("./server/routes/main"));
