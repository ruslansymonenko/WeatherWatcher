document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const locationBtn = document.querySelector('.location-info__btn');
  const closeModalBtn = document.querySelector('.close-modal__btn');
  const bgHide = document.querySelector('._bg-hide');
  const modalCities = document.querySelectorAll('.modal-city__list-item');
  const weatherHourInfo = document.querySelectorAll('.weather-hour');

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
    let hourInfo = weatherData.forecast.forecastday[0].hour

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

    showHoursWeatherInfo(hourInfo);
  }

  function showHoursWeatherInfo (data) {
    weatherHourInfo.forEach(item => {
      let time = item.getAttribute('data-time');
      
      let itemTemp = item.querySelector('.weather-hour__temperature');
      let itemFeels = item.querySelector('.weather-hour__temperature-feels');

      switch(time) {
        case '3am':
          itemTemp.textContent = `${data[3].temp_c} C`;
          itemFeels.textContent = `Feels like ${data[3].feelslike_c} C`;
          break
        case '6am':
          itemTemp.textContent = `${data[6].temp_c} C`;
          itemFeels.textContent = `Feels like ${data[6].feelslike_c} C`;
          break
        case '11am':
          itemTemp.textContent = `${data[11].temp_c} C`;
          itemFeels.textContent = `Feels like ${data[11].feelslike_c} C`;
          break
        case '3pm':
          itemTemp.textContent = `${data[15].temp_c} C`;
          itemFeels.textContent = `Feels like ${data[15].feelslike_c} C`;
          break
        case '6pm':
          itemTemp.textContent = `${data[18].temp_c} C`;
          itemFeels.textContent = `Feels like ${data[18].feelslike_c} C`;
          break
        case '11pm':
          itemTemp.textContent = `${data[23].temp_c} C`;
          itemFeels.textContent = `Feels like ${data[11].feelslike_c} C`;
          break
        default:
          itemTemp.textContent = `0 C`;
          itemFeels.textContent = `Feels like 0 C`;
      }

    })
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
  });

  showWeather(currentCity);
});