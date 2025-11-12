const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT || 5000;

// Fixed CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.error('CRITICAL: Missing EMAIL_USER or EMAIL_APP_PASSWORD in .env file');
    process.exit(1);
}

console.log('✓ Email User:', process.env.EMAIL_USER);
console.log('✓ App Password configured');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD.trim()
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('✗ SMTP Error:', error);
    } else {
        console.log('✓ SMTP Connection Successful');
    }
});

app.post('/api/contact', async (req, res) => {
    console.log('Received request:', req.body);
    
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact: Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);
        console.log('✓ Email sent successfully');
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('✗ Email error:', error.message);
        res.status(500).json({ 
            message: 'Failed to send message', 
            error: error.message 
        });
    }
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running on port ' + port });
});

app.listen(port, () => {
    console.log(`✓ Server running on port ${port}`);
});