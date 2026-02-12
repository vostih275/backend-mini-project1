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
const postsRoutes = require("./routes/posts");
app.use("/posts", postsRoutes);

// Handle 404 for any unmatched route
app.use((req, res) => {
  res.status(404).render('404');
});

// ----------------------
// Start Server
// ----------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});