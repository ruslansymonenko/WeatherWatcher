document.addEventListener('DOMContentLoaded', () => {

  async function getWeather() {
    try {
      const response = await fetch('http://localhost:3000/weather');
      const data = await response.json();
      return data;
    } catch(error) {
      console.log(error);
    }
  }
  async function showWeather () {
    let weatherData = await getWeather();
    console.log(weatherData);
  }

  showWeather();
});