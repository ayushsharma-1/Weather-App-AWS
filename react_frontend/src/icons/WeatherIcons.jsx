import React from 'react';
import { 
  WiDaySunny, 
  WiDayCloudy, 
  WiCloud, 
  WiDayRain, 
  WiDayShowers, 
  WiDayThunderstorm, 
  WiDaySnow, 
  WiDayFog,
  WiNightClear,
  WiNightCloudy,
  WiNightRain,
  WiNightThunderstorm,
  WiNightSnow,
  WiNightFog
} from 'react-icons/wi';

// Function to get weather icon based on OpenWeatherMap condition code
export const getWeatherIcon = (iconCode, size = 36) => {
  // Check if it's day or night from the icon code
  const isDay = !iconCode.includes('n');
  const condition = iconCode.slice(0, 2);
  
  switch (condition) {
    case '01': // clear sky
      return isDay ? <WiDaySunny size={size} /> : <WiNightClear size={size} />;
    case '02': // few clouds
      return isDay ? <WiDayCloudy size={size} /> : <WiNightCloudy size={size} />;
    case '03': // scattered clouds
    case '04': // broken clouds
      return <WiCloud size={size} />;
    case '09': // shower rain
      return isDay ? <WiDayShowers size={size} /> : <WiNightRain size={size} />;
    case '10': // rain
      return isDay ? <WiDayRain size={size} /> : <WiNightRain size={size} />;
    case '11': // thunderstorm
      return isDay ? <WiDayThunderstorm size={size} /> : <WiNightThunderstorm size={size} />;
    case '13': // snow
      return isDay ? <WiDaySnow size={size} /> : <WiNightSnow size={size} />;
    case '50': // mist
      return isDay ? <WiDayFog size={size} /> : <WiNightFog size={size} />;
    default:
      return isDay ? <WiDaySunny size={size} /> : <WiNightClear size={size} />;
  }
};

export default {
  getWeatherIcon
};