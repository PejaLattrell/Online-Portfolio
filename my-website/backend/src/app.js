const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration for Vercel
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://online-portfolio-six.vercel.app',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

// Import routes
const apiRoutes = require('./routes/api');
app.use(apiRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`✓ Server running on port ${port}`);
  });
}

module.exports = app;

