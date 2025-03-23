import React from 'react';
import { getWeatherIcon } from '../icons/WeatherIcons';

const DailyForecast = ({ dailyForecast }) => {
  return (
    <div className="days-forecast">
      <h3>5 Days Forecast:</h3>
      {dailyForecast.map((day, index) => (
        <div className="day-forecast" key={index}>
          <div className="day-weather-icon">
            {getWeatherIcon(day.condition, 24)}
          </div>
          <div className="day-temp">{day.temp}°C</div>
          <div className="day-name">{day.day}</div>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;