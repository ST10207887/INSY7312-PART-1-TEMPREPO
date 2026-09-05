const fs = require("fs");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// HTTPS setup
const sslOptions = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.cert")
};


const PORT = process.env.PORT || 3000;

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Secure server running on https://localhost:${PORT}`);
});

// Protected route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, this is your profile.` });
});

// Logout route
app.post("/api/auth/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});
