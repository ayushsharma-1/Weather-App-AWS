// backend/server.js
const express = require('express');
const weatherRoutes = require('./routes/weather');
const dotenv = require('dotenv');
const cors = require('cors');  // Import CORS

require('dotenv').config();
// console.log("API Key:", process.env.OPENWEATHERMAP_API_KEY);


const app = express();
app.use(express.json());
app.use(cors());  // Enable CORS for all routes

// Weather routes
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

