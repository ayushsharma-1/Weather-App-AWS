import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import CurrentWeather from './CurrentWeather';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';
import { formatTime, formatDate } from './utils/weatherUtils';


const WeatherApp = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [city, setCity] = useState('Kanpur'); // Default city as fallback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // API key - in a real app, store this in environment variables
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Fetch current weather data
  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      // Current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error(`City not found or API error: ${weatherResponse.statusText}`);
      }
      
      const weatherResult = await weatherResponse.json();
      setWeatherData(weatherResult);
      
      // 5-day forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error(`Forecast data error: ${forecastResponse.statusText}`);
      }
      
      const forecastResult = await forecastResponse.json();
      setForecastData(forecastResult);
      
      setCity(cityName);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeatherData(searchInput);
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          setError(`Geolocation error: ${err.message}`);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!weatherResponse.ok) {
        throw new Error(`API error: ${weatherResponse.statusText}`);
      }
      
      const weatherResult = await weatherResponse.json();
      setWeatherData(weatherResult);
      setCity(weatherResult.name);
      
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      
      if (!forecastResponse.ok) {
        throw new Error(`Forecast data error: ${forecastResponse.statusText}`);
      }
      
      const forecastResult = await forecastResponse.json();
      setForecastData(forecastResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  // Initial data load - get current location first
  useEffect(() => {
    // Try to get current location first
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          // If geolocation fails, fall back to default city
          console.error("Geolocation error:", error);
          fetchWeatherData(city); // Use default city as fallback
        }
      );
    } else {
      // If geolocation is not supported, fall back to default city
      fetchWeatherData(city);
    }
  }, []);

  // Group forecast data by day
  const getDailyForecast = () => {
    if (!forecastData) return [];
    
    const dailyData = {};
    
    // Group by day and find max temperature for each day
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split('T')[0];
      
      if (!dailyData[day] || item.main.temp > dailyData[day].temp) {
        dailyData[day] = {
          day: formatDate(item.dt),
          temp: Math.round(item.main.temp),
          condition: item.weather[0].icon,
          dt: item.dt
        };
      }
    });
    
    // Convert object to array and take only the first 5 days
    return Object.values(dailyData).slice(0, 5);
  };

  // Get hourly forecast data (next 5 timepoints)
  const getHourlyForecast = () => {
    if (!forecastData) return [];
    return forecastData.list.slice(0, 5).map(item => ({
      time: formatTime(item.dt),
      temp: Math.round(item.main.temp),
      condition: item.weather[0].icon,
      windSpeed: Math.round(item.wind.speed),
      windDeg: item.wind.deg
    }));
  };

  if (loading) {
    return <div className="loading">Loading weather data...</div>;
  }

  return (
    <div className={`weather-app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <TopBar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        getCurrentLocation={getCurrentLocation}
      />

      {error && <div className="error-message">{error}</div>}

      {weatherData && (
        <>
          <div className="content-container">
            <div className="city-time-card">
              <h2 className="city">{city}</h2>
              <div className="time">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="date">{currentTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short' })}</div>
            </div>

            <CurrentWeather 
              weatherData={weatherData} 
              formatTime={formatTime}
            />
          </div>

          <div className="forecast-container">
            <DailyForecast dailyForecast={getDailyForecast()} />
            <HourlyForecast hourlyForecast={getHourlyForecast()} />
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;