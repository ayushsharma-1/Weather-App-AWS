// backend/server.js
const express = require('express');
const weatherRoutes = require('./routes/weather');
const dotenv = require('dotenv');
const cors = require('cors');

require('dotenv').config();



const app = express();
app.use(express.json());
app.use(cors());  


app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

