// src/api/weatherApi.js
import axios from 'axios';

export const fetchWeatherData = async (cities) => {
  const promises = cities.map(city => {
    const url = `http://localhost:5000/api/weather?cities=${city}`; // Update with your backend endpoint
    console.log('Fetching weather data from:', url); // Log the URL for debugging
    return axios.get(url);
  });

  try {
    const responses = await Promise.all(promises);
    // Map the responses to the required format
    return responses.map(response => response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error); // Log fetch error for debugging
    throw error; // Re-throw the error for handling in the calling function
  }
};
