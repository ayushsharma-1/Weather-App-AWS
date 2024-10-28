import React from 'react';
import PropTypes from 'prop-types';

const WeatherDisplay = ({ weatherData }) => {
  return (
    <div className="weather-display">
      {Array.isArray(weatherData) && weatherData.length > 0 ? (
        weatherData.map((data, index) => (
          <div key={index} className="weather-card">
            <h2>{data.name}</h2>
            <p>Temperature: {data.main.temp}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Weather: {data.weather[0].description}</p>
          </div>
        ))
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

// Prop validation
WeatherDisplay.propTypes = {
  weatherData: PropTypes.array.isRequired,
};

export default WeatherDisplay;
