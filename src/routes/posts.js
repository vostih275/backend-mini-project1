const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Helper: Safe JSON read
function readJSON(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading JSON:", err.message);
    return [];
  }
}

// GET all posts
router.get("/", (req, res) => {
  const dataPath = path.join(__dirname, "..", "data", "posts.json");
  const posts = readJSON(dataPath);
  console.log("JSON path:", dataPath);     
  console.log("Posts loaded:", posts);
  res.render("posts", { posts });
});

// GET single post by ID
router.get("/:id", (req, res) => {
  const dataPath = path.join(__dirname, "..", "data", "posts.json");
  const posts = readJSON(dataPath);

  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).send("Post not found");

  res.render("post", { post });
});

module.exports = router;