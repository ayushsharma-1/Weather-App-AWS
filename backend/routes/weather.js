const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config(); // Ensure you load environment variables

const API_KEY = process.env.WEATHER_API_KEY; // Store your API key in .env
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

router.get('/', async (req, res) => {
  const cities = req.query.cities ? req.query.cities.split(',') : [];

  if (cities.length === 0) {
    return res.status(400).json({ error: 'No cities provided.' });
  }

  try {
    const weatherPromises = cities.map(city => 
      axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`)
    );

    const weatherResponses = await Promise.all(weatherPromises);
    const weatherData = weatherResponses.map(response => response.data);

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Could not fetch weather data.' });
  }
});

module.exports = router;
