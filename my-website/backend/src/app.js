const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); //connect env file

const app = express();
const port = process.env.PORT || 3000;

// More detailed CORS configuration
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Update this to match your frontend URL
    methods: ['POST'],
    credentials: true
}));
app.use(express.json());

// Log environment variables (remove in production)
console.log('Environment check:', {
    emailUser: process.env.EMAIL_USER ? 'Set' : 'Missing',
    emailPass: process.env.EMAIL_APP_PASSWORD ? 'Set' : 'Missing',
    envPath: require.main.paths
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    },
    debug: true // Enable debug logs
});

app.post('/api/contact', async (req, res) => {
    console.log('Received request:', req.body);
    
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            throw new Error('Missing required fields');
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact: Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info);
        res.status(200).json({ message: 'Message sent successfully', info });
    } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({ 
            message: 'Failed to send message', 
            error: error.message 
        });
    }
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});