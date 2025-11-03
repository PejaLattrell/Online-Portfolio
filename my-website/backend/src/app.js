const express = require('express');
const cors = require('cors');
const contactRouter = require('./routes/contact');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(contactRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});