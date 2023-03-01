document.addEventListener('DOMContentLoaded', () => {

  let currentCity = {city: 'London'};

  async function getWeather(cityData) {
    try {
      const response = await fetch('http://localhost:3000/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cityData)
      });
      const data = await response.json();
      return data;
    } catch(error) {
      console.log(error);
    }
  }
  async function showWeather (cityData) {
    let weatherData = await getWeather(cityData);

    const city = document.querySelector('.location-info__city');
    const country = document.querySelector('.location-info__country');
    const currentTemp = document.querySelector('.location-info__temperature');
    const humidity = document.querySelector('.weather-item__value-humidity');
    const airPressure = document.querySelector('.weather-item__value-pressure');
    const windSpeed = document.querySelector('.weather-item__value-wind');


    city.textContent = weatherData.location.name;
    country.textContent = weatherData.location.country;
    currentTemp.textContent = `${weatherData.current.temp_c} C`;
    humidity.textContent = `${weatherData.current.humidity} %`;
    airPressure.textContent = weatherData.current.pressure_mb;
    windSpeed.textContent = `${weatherData.current.wind_kph} kph`;
  }

  showWeather(currentCity);
});