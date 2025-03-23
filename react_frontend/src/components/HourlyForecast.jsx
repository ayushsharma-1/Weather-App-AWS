import React from 'react';
import { getWeatherIcon } from '../icons/WeatherIcons';
import { getWindDirectionIcon } from './utils/weatherUtils';

const HourlyForecast = ({ hourlyForecast }) => {
  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast:</h3>
      <div className="hourly-forecast-items">
        {hourlyForecast.map((hour, index) => (
          <div className="hour-forecast" key={index}>
            <div className="hour-time">{hour.time}</div>
            <div className="hour-weather-icon">
              {getWeatherIcon(hour.condition, 32)}
            </div>
            <div className="hour-temp">{hour.temp}°C</div>
            <div className="hour-wind-direction">
              {getWindDirectionIcon(hour.windDeg)}
            </div>
            <div className="hour-wind-speed">{hour.windSpeed} km/h</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;