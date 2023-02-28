document.addEventListener('DOMContentLoaded', () => {


  function getWeather() {
    fetch('http://localhost:3000/weather')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

});