README

Postman collection link: https://.postman.co/workspace/My-Workspace\~e3971f8c-764a-4a11-84e6-91a82bba5a98/request/57973635-aff1803e-a143-4f19-84af-d55a42761c82?action=share\&creator=57973635\&active-environment=57973635-1c6d2fdf-7350-4a29-b18d-0c641c742cc8 



**Authentication PI - INSY7314 Summative Project Part 1**

Overview This project demonstrate a complete JWT-based authentication flow using Node.js, Express, and Postman. It included User registration, login, protected routes, logout input validation, error handling, and HTTPS configuration.

Evidence is provided through screenshots, a Postman collection, and a security focused architecture diagram.



**Technologies Used**

* Node.js + Express - backend framework
* bcryptjs - password hashing
* jsongwebtoken (JWT) - token-based authentication
* helmet \& cors - security middleware
* Postman - API testing tool
* GitHub - version control and evidence commits
* HTTPS (SSL) - secure communication with self-signed certificate



**Question 1 - MERN Architecture Diagram**

Client (React) → Sends HTTPS requests, stores JWT.

Server (Node.js + Express) → Handles routes, validates input, hashes passwords, generates JWT.

Database (MongoDB) → Future persistent storage (currently in-memory).

Security Layers: HTTPS encryption, password hashing, JWT authentication, Helmet \& CORS, input validation, error handling.



**Steps \& Evidence**

Step 1: Register User (success)

request:POST /api/auth/register

{

&#x20; "username": "testuser",

&#x20; "password": "mypassword123"

}



Response: { "message": "User registered successfully" }

Screenshot: screenshots/Step1\_register\_sucess.png



Step 2: Register Duplicate User (conflict)

Response: { "error": "User already exists" }

Screenshot: screenshots/Step2\_register\_duplicate.png



Step 3: Login User (Success)

Response: {

&#x20; "message": "Login successful",

&#x20; "token": "eyJhbGciOiJIUzI1NiIs..."

}

Screenshot: screenshots/Step3\_login\_invalid.png



Step 4: Token generation

Screenshot: screenshots/Step4\_token\_generation.png







Step 5: Protect Route (/api/profile)

Valid token response: { "message": "Welcome testuser, this is your profile." }



Invalid token response: { "error": "Invalid token" }



No token response: { "error": "No token provided" }



Screenshots: screenshots/Step5\_valid\_token.png

screenshots/Step5.2\_no\_token.png

screenshots/Step5.3\_invalid\_token.png





Step 6 Input Validation \& Error Handling

Missing username response: {"error": "Username is required"}

Missing Password response: {"error": "Password is required"}

Both Missing response: {"error": Username and password are required"}



Screenshots: screenshots/Step6\_Username\_\&\_password\_required.png

screenshots/Step6.2\_Password\_required.png

screenshots/Step6.3\_Username\_required.png



Step 7: Logout User

Response: {"message: "Logout successful"}

Screenshot: screenshots/Step7\_Logout\_evidence.png



Step 8: HTTPS register 

Configured with self-signed SSL certificate (server.key, server.cert).

API tested successfully in Postman over https://localhost:3000

Screenshot: screenshots/Step8\_HTTPS\_register\_success.png



SECURITY DETAILS



1\. PASSWORD HAHSHING (bcrypt)

Decision: Before being stored, all passwords are hashed using bcrypt.

Reason: In the event that data is hacked, it keeps plain-text passwords hidden.

Implementation: const token = jwt.sign({ username }, process.env.JWT\_SECRET, { expiresIn: "1h" });

Outcome: Attackers cannot extract actual passwords even if they have access to stored data.





2\. JWT authentication

Decision: JSON Web Tokens (JWT) are used for user authentication.

Reason: gives safe, stateless identity for later requests.

Implementation: const token = jwt.sign({ username }, process.env.JWT\_SECRET, { expiresIn: "1h" });

Outcome:  Sensitive endpoints are only accessible by authenticated users thanks to the token's validation on each protected route.



3\. HTTPS Encryption

Decision: The server runs over HTTPS using a self-signed SSL certificate

Reason: It encrypts all communication between client and server, preventing interception of credentials or tokens. 

Implementation: https.createServer(sslOptions, app).listen(PORT, () => {

&#x20; console.log(`Secure server running on https://localhost:${PORT}`);

});

Outcome: The API requests are transmitted securely



4\. Helmet \& CORS

Decision: helmet and cors middleware are used to enhance security headers and control cross-origin requests

Reason: Protects against common web vulnerabilities like XSS and clickjacking

Implemenation: app.use(helmet());

app.use(cors());

Outcome: Adds secure HTTPS headers and allows safe client-server relationship



5\. Input Validation

Decision: All user inputs are validated before processing

Reason: Prevents malicious or incomplete data from being accepted

Implemenation: if (!username \&\& !password) {

&#x20; return res.status(400).json({ error: "Username and password are required" });

}

Outcome: Ensures clean, safe data entry and protects against injection based attacks



6\. Error Handling

Decision: Controlled error responses are used instead of exposing internal details

Reason: Prevents attackers from learning about system internals (stack traces, file paths)

Implementation: return res.status(401).json({ error: "Invalid credentials" });

Outcome: Consistence, user-friendly error messages that maintain system confidentiality



**Conclusion:**

* This project exemplifies a thorough authentication cycle with robust security measures:
* Registration and avoiding duplicates
* Success or failure of the login
* Routes protected by JWT
* Log off
* Strong validation and error management
* Encryption via HTTPS
* Clear documentation that includes security decisions and an architecture diagram





