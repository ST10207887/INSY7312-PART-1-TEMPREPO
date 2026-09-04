const fs = require("fs");
const https = require("https");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
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
  key: fs.readFileSync("./config/ssl/key.pem"),
  cert: fs.readFileSync("./config/ssl/cert.pem")
};

https.createServer(sslOptions, app).listen(process.env.PORT, () => {
  console.log(`Secure server running on https://localhost:${process.env.PORT}`);
});
