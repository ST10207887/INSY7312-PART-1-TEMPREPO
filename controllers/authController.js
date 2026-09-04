const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = []; // temporary storage

// Register User
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username && !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  // Duplicate check
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: "User already exists" });
  }

  // Save user
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
};

// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username && !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  // Find user
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  // Compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  // Generate token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
};
