const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const axios = require("axios")

const app = express();
const port = process.env.PORT || 5000;
const issuesFilePath = path.join(__dirname, "issues.json");

app.use(bodyParser.json());
app.use(cors());

const API_KEY = "685a6d556bd64d2090408a72feb1609a"; // Replace with your News API key
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

app.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get(NEWS_API_URL);
    console.log(response)
    res.json(response.data.articles.slice(0, 4));
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to fetch news" });
  }
});


// Middleware to check if issues.json exists
app.use((req, res, next) => {
  if (!fs.existsSync(issuesFilePath)) {
    fs.writeFileSync(issuesFilePath, JSON.stringify({ issues: [] }));
  }
  next();
});

// Endpoint to report an issue
app.post("/issues", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Issue title and description are required" });
  }

  const issues = JSON.parse(fs.readFileSync(issuesFilePath));
  const newIssue = {
    id: Date.now().toString(),
    title,
    description,
    status: "Open",
  };
  issues.issues.push(newIssue);
  fs.writeFileSync(issuesFilePath, JSON.stringify(issues));

  res.status(201).json(newIssue);
});

// Endpoint to get issues
app.get("/issues", (req, res) => {
  const issues = JSON.parse(fs.readFileSync(issuesFilePath));
  res.json(issues);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
