const express = require("express");
const path = require("path");

const app = express();

// ----------------------
// View Engine Setup
// ----------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ----------------------
// Middleware
// ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// ----------------------
// Routes
// ----------------------

// Home route
app.get("/", (req, res) => {
  res.send("Simple Blog Page API is running");
});

// Import posts routes
const postsRoutes = require("./routes/posts"); // make sure this file exists
app.use("/posts", postsRoutes);

// ----------------------
// Start Server
// ----------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});