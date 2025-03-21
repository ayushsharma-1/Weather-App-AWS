// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';
import bgVideo from './icons/background.mp4';
import AlertDisplay from './components/AlertDisplay';
import DailySummaryComponent from './components/DailySummaryComponent';

const calculateDailySummary = (data) => {
  const totalTemp = data.reduce((sum, city) => sum + city.main.temp, 0);
  const averageTemp = totalTemp / data.length;

  const maxTemp = Math.max(...data.map(city => city.main.temp));
  const minTemp = Math.min(...data.map(city => city.main.temp));

  const currentDate = new Date().toLocaleDateString();

  return {
    date: currentDate,
    averageTemp: averageTemp.toFixed(1),
    maxTemp: maxTemp.toFixed(1),
    minTemp: minTemp.toFixed(1),
  };
};

const checkAlerts = (cityData, alertConfig) => {
  const { temp } = cityData.main;

  if (temp > alertConfig.highTemp) {
    return `High Temperature Alert in ${cityData.name} : ${temp}°C.`;
  }

  if (temp < alertConfig.lowTemp) {
    return `Low Temperature Alert in ${cityData.name} : ${temp}°C.`;
  }

  return null;
};

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [dailySummary, setDailySummary] = useState(null)
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  const alertConfig = {
    highTemp: 28,
    lowTemp: 10,
  };

  const fetchWeatherData = useCallback(async () => {
    const cities = 'Delhi,Mumbai,Kanpur,Jhansi,Srinagar,Bangalore';
    const url = `http://13.234.66.183:5000/api/weather?cities=${cities}`;

    try {
      const response = await axios.get(url);
      console.log('Fetched Weather Data: ', response.data); // Check data structure here
      const data = response.data;

      setWeatherData(data);
      setError(null);
      
      // for daily summary
      const summary = calculateDailySummary(data);
      setDailySummary(summary);

      // Check for alerts
      const newAlerts = data
        .map(cityData => checkAlerts(cityData, alertConfig))
        .filter(alert => alert !== null);
      setAlerts(newAlerts);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Could not fetch weather data. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchWeatherData();

    // Set up an interval to fetch data every 2 minutes (120,000 ms)
    const intervalId = setInterval(fetchWeatherData, 120000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchWeatherData]);


  return (
    <div className="App">
      <video autoPlay loop muted className="bg-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1 className="Header">Weather Monitoring System</h1>
        {error && <div className="error">{error}</div>}


        <AlertDisplay alerts={alerts} />


        <WeatherDisplay weatherData={weatherData} />


        {dailySummary && (
        <div className="daily-summary">
          <h2>Daily Summary: {dailySummary.date}</h2>
          <p>Average Temperature: {dailySummary.averageTemp}°C</p>
          <p>Maximum Temperature: {dailySummary.maxTemp}°C</p>
          <p>Minimum Temperature: {dailySummary.minTemp}°C</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default App;
