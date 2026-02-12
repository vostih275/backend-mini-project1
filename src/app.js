const express = require("express");
const path = require("path");

const app = express();

const posts = require("./data/posts.json");

const teamMembers = [
  "Steve Maxwell",
  "Michaelkingdev", 
];

const quotes = [
  "Code is like humor. When you have to explain it, it’s bad.",
  "First, solve the problem. Then, write the code.",
  "Simplicity is the soul of efficiency.",
  "Any fool can write code that  computer can understand. Good programmers write code that humans can understand.",
  "Programming is a n art of alogarithim design and the craft of debugging errant code.",
  "simplicity is the soul of effeciency.",
  "If debugging is the process of removing software bugs, then programming must the process of putting them in.",
  "It's not a bug; it's an undocummented feature.",
];

app.get("/", (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.render("home", { posts, teamMembers, randomQuote });
});

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