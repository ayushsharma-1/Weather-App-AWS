// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      const cities = 'Delhi,Mumbai,Kanpur,Jhansi,Srinagar,Bangalore';
      const url = `http://localhost:5000/api/weather?cities=${cities}`;
      console.log('Fetching weather data from:', url); // Log the URL for debugging
      try {
        const response = await axios.get(url);
        setWeatherData(response.data); // Ensure response.data is an array
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Could not fetch weather data. Please try again later.');
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="App">
      <h1>Weather Monitoring System</h1>
      {error && <div className="error">{error}</div>}
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default App;
