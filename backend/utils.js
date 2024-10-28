// backend/utils.js
function processWeatherData(data) {
    if (data.cod !== 200) {
        return { error: 'City not found' };
    }
    return {
        city: data.name,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        weather: data.weather[0].main,
        humidity: data.main.humidity,
        timestamp: data.dt
    };
}

module.exports = { processWeatherData };
