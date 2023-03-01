document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const locationBtn = document.querySelector('.location-info__btn');
  const closeModalBtn = document.querySelector('.close-modal__btn');
  const bgHide = document.querySelector('._bg-hide');
  const modalCities = document.querySelectorAll('.modal-city__list-item');

  let currentCity = {city: 'Kiev'};

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

  function showModal () {
    bgHide.classList.add('_bg-hide--active');
    modal.classList.add('modal--active');
  }

  function closeModal() {
    bgHide.classList.remove('_bg-hide--active');
    modal.classList.remove('modal--active');
  }

  locationBtn.addEventListener('click', () => {
    showModal();
  })

  closeModalBtn.addEventListener('click', () => {
    closeModal();
  })

  modalCities.forEach(item => {
    item.addEventListener('click', () => {
      currentCity.city = item.textContent;
      showWeather(currentCity);
      closeModal();
    })
  })
  showWeather(currentCity);
});