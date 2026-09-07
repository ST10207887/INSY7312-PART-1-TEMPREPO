README

Authentication PI - INSY7314 Summative Project Part 1
Overview This project demonstrate a complete JWT-based authentication flow using Node.js, Express, and Postman. It included User registration, login, protected routes, logout input validation, error handling, and HTTPS configuration.
Evidence is provided through screenshots, a Postman collection, and a security focused architecture diagram.

Technologies Used
Node.js + Express - backend framework
bcryptjs - password hashing
jsongwebtoken (JWT) - token-based authentication
helmet & cors - security middleware
Postman - API testing tool
GitHub - version control and evidence commits
HTTPS (SSL) - secure communication with self-signed certificate

SECURITY DETAILS

1. PASSWORD HAHSHING (bcrypt)
Decision: Before being stored, all passwords are hashed using bcrypt.
Reason: In the event that data is hacked, it keeps plain-text passwords hidden.
Implementation: const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
Outcome: Attackers cannot extract actual passwords even if they have access to stored data.


2. JWT authentication
Decision: JSON Web Tokens (JWT) are used for user authentication.
Reason: gives safe, stateless identity for later requests.
Implementation: const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
Outcome:  Sensitive endpoints are only accessible by authenticated users thanks to the token's validation on each protected route.

3. HTTPS Encryption
Decision: The server runs over HTTPS using a self-signed SSL certificate
Reason: It encrypts all communication between client and server, preventing interception of credentials or tokens. 
Implementation: https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Secure server running on https://localhost:${PORT}`);
});
Outcome: The API requests are transmitted securely

4. Helmet & CORS
Decision: helmet and cors middleware are used to enhance security headers and control cross-origin requests
Reason: Protects against common web vulnerabilities like XSS and clickjacking
Implemenation: app.use(helmet());
app.use(cors());
Outcome: Adds secure HTTPS headers and allows safe client-server relationship

5. Input Validation
Decision: All user inputs are validated before processing
Reason: Prevents malicious or incomplete data from being accepted
Implemenation: if (!username && !password) {
  return res.status(400).json({ error: "Username and password are required" });
}
Outcome: Ensures clean, safe data entry and protects against injection based attacks

6. Error Handling
Decision: Controlled error responses are used instead of exposing internal details
Reason: Prevents attackers from learning about system internals (stack traces, file paths)
Implementation: return res.status(401).json({ error: "Invalid credentials" });
Outcome: Consistence, user-friendly error messages that maintain system confidentiality

