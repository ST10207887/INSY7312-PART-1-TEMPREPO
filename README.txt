README

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
