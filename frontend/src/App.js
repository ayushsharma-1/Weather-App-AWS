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
      try {
        const response = await axios.get(url);
        console.log("Fetched Weather Data: ", response.data); // Check data structure here
        setWeatherData(response.data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Could not fetch weather data. Please try again later.');
      }
    };

    // Fetch data initially
    fetchWeatherData();

    // Set up an interval to fetch data every 2 minutes (120,000 ms)
    const intervalId = setInterval(fetchWeatherData, 120000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  

  return (
    <div className="App">
      <video autoPlay loop muted className="bg-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
      <h1 className="Header">Weather Monitoring System</h1>
      {error && <div className="error">{error}</div>}
      <WeatherDisplay weatherData={weatherData} />
    </div>
    </div>
  );
};

export default App;
