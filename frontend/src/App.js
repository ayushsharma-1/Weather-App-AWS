// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';
import bgVideo from './icons/background.mp4';
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
      <video autoPlay loop muted className="bg-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
      <h1>Weather Monitoring System</h1>
      {error && <div className="error">{error}</div>}
      <WeatherDisplay weatherData={weatherData} />
    </div>
    </div>
  );
};

export default App;
