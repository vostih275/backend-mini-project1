const express = require("express");
const path = require("path");

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Home route (temporary)
app.get("/", (req, res) => {
  res.send("Simple Blog Page API is running");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
