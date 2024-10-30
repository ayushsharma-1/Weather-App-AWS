import React from 'react';
import PropTypes from 'prop-types';

// Import SVGs
import CloudIcon from '../icons/cloud.svg';
import HumidityIcon from '../icons/humidity.svg';
import LocationIcon from '../icons/location.svg';
import SunIcon from '../icons/sun.svg';
import PressureIcon from '../icons/pressure.svg';
import WindDirectionIcon from '../icons/wind-direction.svg';
import WindIcon from '../icons/wind.svg';

const WeatherDisplay = ({ weatherData }) => {
  return (
    <div className="weather-display">
      {Array.isArray(weatherData) && weatherData.length > 0 ? (
        weatherData.map((data, index) => (
          <div key={index} className="weather-card">
            <h2>
              <img src={LocationIcon} alt="Location" className="icon" />
              {data.city || data.name}
            </h2>
            <p>
              <img src={SunIcon} alt="Temperature" className="icon" />
              Temperature: {data.main.temp ? `${data.main.temp}°C` : 'N/A'}
            </p>
            <p>
              <img src={SunIcon} alt="Feels Like" className="icon" />
              Feels Like: {data.main.feels_like ? `${data.main.feels_like}°C` : 'N/A'}
            </p>
            <p>
              <img src={HumidityIcon} alt="Humidity" className="icon" />
              Humidity: {data.main.humidity ? `${data.main.humidity}%` : 'N/A'}
            </p>
            <p>
              <img src={CloudIcon} alt="Weather" className="icon" />
              Weather: {Array.isArray(data.weather) && data.weather[0]?.main ? data.weather[0].main : 'N/A'}
            </p>
            <p>
              <img src={WindIcon} alt="Wind Speed" className="icon" />
              Wind Speed: {data.wind.speed ? `${data.wind.speed} m/s` : 'N/A'}
            </p>
            <p>
              <img src={WindDirectionIcon} alt="Wind Direction" className="icon" />
              Wind Direction: {data.wind.deg ? `${data.wind.deg}°` : 'N/A'}
            </p>
            <p>
              <img src={PressureIcon} alt="Pressure" className="icon" />
              Pressure: {data.main.pressure ? `${data.main.pressure} hPa` : 'N/A'}
            </p>
          </div>
        ))
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

WeatherDisplay.propTypes = {
  weatherData: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
        feels_like: PropTypes.number,
        humidity: PropTypes.number.isRequired,
        pressure: PropTypes.number,
      }).isRequired,
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          main: PropTypes.string,
        })
      ).isRequired,
      wind_speed: PropTypes.number,
      wind_direction: PropTypes.number,
    })
  ).isRequired,
};

export default WeatherDisplay;
