const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./users'); 
const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true })); // Allow all origins for now

// Ensure environment variables are set
if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env file");
    process.exit(1);
}
if (!process.env.JWT_SECRET) {
    console.error("Error: JWT_SECRET is not defined in .env file");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error("MongoDB connection error:", err));

// Register Route
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});

// Scan Route
app.post('/api/scan', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ success: false, message: 'URL is required' });
        }

        const safeWebsites = [
            "https://www.google.com",
            "https://www.wikipedia.org",
            "https://www.github.com",
            "https://www.microsoft.com",
            "https://www.apple.com",
            "https://www.facebook.com",
        ];

        const vulnerabilities = [
            "SQL Injection",
            "Cross-Site Scripting (XSS)",
            "Broken Access Control",
            "Insecure Direct Object References (IDOR)",
            "Cross-Site Request Forgery (CSRF)",
            "Clickjacking",
            "Server-Side Request Forgery (SSRF)",
            "Security Misconfiguration",
        ];

        let detected = [];
        if (safeWebsites.includes(url.toLowerCase())) {
            detected = ["No vulnerabilities found"];
        } else {
            detected = vulnerabilities.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 1);
        }

        res.json({ url, foundVulnerabilities: detected });
    } catch (error) {
        console.error("Scan error:", error);
        res.status(500).json({ success: false, message: 'Scan failed' });
    }
});
mongoose.connect("mongodb://localhost:27017/admin/logs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  // Schema for logs
  const scanSchema = new mongoose.Schema({
    url: String,
    foundVulnerabilities: Array,
    scanDate: { type: Date, default: Date.now },
  });
  
  const ScanLog = mongoose.model("ScanLog", scanSchema);
  
  // API Route for scanning
  app.post("/api/scan", async (req, res) => {
    const { url } = req.body;
  
    // Simulating scan results
    const vulnerabilities = ["SQL Injection", "XSS", "CSRF", "No vulnerabilities found"];
    const foundVulnerabilities = [vulnerabilities[Math.floor(Math.random() * vulnerabilities.length)]];
  
    // Save to MongoDB
    const newLog = new ScanLog({ url, foundVulnerabilities });
    await newLog.save();
  
    res.json({ url, foundVulnerabilities });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
