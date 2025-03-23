import React from 'react';
import { FiDroplet, FiWind, FiArrowUp, FiArrowDown, FiAward } from 'react-icons/fi';
import { TbGauge } from 'react-icons/tb';
import { getWeatherIcon } from '../icons/WeatherIcons';

const CurrentWeather = ({ weatherData, formatTime }) => {
  return (
    <div className="current-weather-card">
      <div className="temperature-container">
        <div className="main-temp">{Math.round(weatherData.main.temp)}°C</div>
        <div className="feels-like">Feels like: {Math.round(weatherData.main.feels_like)}°C</div>
      </div>
      <div className="sun-info">
        <div className="sunrise">
          <FiArrowUp /> Sunrise
          <div>{formatTime(weatherData.sys.sunrise)}</div>
        </div>
        <div className="sunset">
          <FiArrowDown /> Sunset
          <div>{formatTime(weatherData.sys.sunset)}</div>
        </div>
      </div>
      <div className="weather-icon-container">
        <div className="weather-icon">
          {weatherData.weather && weatherData.weather[0] && 
            getWeatherIcon(weatherData.weather[0].icon, 64)}
        </div>
        <div className="weather-description">
          {weatherData.weather && weatherData.weather[0] && 
            weatherData.weather[0].description.charAt(0).toUpperCase() + 
            weatherData.weather[0].description.slice(1)}
        </div>
      </div>
      <div className="weather-details">
        <div className="detail">
          <FiDroplet className="detail-icon" />
          <div className="detail-value">{weatherData.main.humidity}%</div>
          <div className="detail-label">Humidity</div>
        </div>
        <div className="detail">
          <FiWind className="detail-icon" />
          <div className="detail-value">{Math.round(weatherData.wind.speed)} km/h</div>
          <div className="detail-label">Wind Speed</div>
        </div>
        <div className="detail">
          <TbGauge className="detail-icon" />
          <div className="detail-value">{weatherData.main.pressure} hPa</div>
          <div className="detail-label">Pressure</div>
        </div>
        <div className="detail">
          <FiAward className="detail-icon" />
          <div className="detail-value">
            {weatherData.visibility ? Math.round(weatherData.visibility / 1000) : "N/A"}
          </div>
          <div className="detail-label">Visibility (km)</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;