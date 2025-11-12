const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

// Create transporter with better error handling
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    },
    debug: true // Shows detailed logs
});

// Verify transporter configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('Nodemailer configuration error:', error);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// Contact form endpoint
router.post('/api/contact', async (req, res) => {
    console.log('📧 Received contact form submission:', req.body);
    
    try {
        const { name, email, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ 
                message: 'Missing required fields: name, email, and message are required' 
            });
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: 'Invalid email format' 
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Your Gmail where you receive messages
            replyTo: email, // Allows you to reply directly to the sender
            subject: `Portfolio Contact from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #61dafb; padding-bottom: 10px;">
                        New Portfolio Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong>👤 Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong>📧 Email:</strong> ${email}</p>
                    </div>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #333;">💬 Message:</h3>
                        <p style="background-color: #fff; padding: 15px; border-left: 4px solid #61dafb; line-height: 1.6;">
                            ${message.replace(/\n/g, '<br>')}
                        </p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    
                    <p style="color: #666; font-size: 12px; text-align: center;">
                        <em>This message was sent from your portfolio contact form at ${new Date().toLocaleString()}</em>
                    </p>
                </div>
            `,
            text: `
Portfolio Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
Sent at: ${new Date().toLocaleString()}
            `
        };

        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email sent successfully:', info.messageId);
        
        res.status(200).json({ 
            message: 'Message sent successfully!',
            messageId: info.messageId
        });
        
    } catch (error) {
        console.error('❌ Error sending email:', error);
        
        // More specific error messages
        let errorMessage = 'Failed to send message. Please try again later.';
        
        if (error.code === 'EAUTH') {
            errorMessage = 'Email authentication failed. Please check server configuration.';
        } else if (error.code === 'ECONNECTION') {
            errorMessage = 'Could not connect to email server.';
        }
        
        res.status(500).json({ 
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;
