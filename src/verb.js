function displayTemperature(response) {
  let thisCity = document.querySelector("#present-city");
  let presentDate = document.querySelector("#present-date");
  let date = new Date(response.data.time * 1000);
  let displayTemp = document.querySelector("#present-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let icon = document.querySelector("#present-temperature-icon");
  let conditions = document.querySelector("#present-conditions");
  let humidity = document.querySelector("#present-humidity");
  let wind = document.querySelector("#present-wind");

  thisCity.innerHTML = response.data.city;
  presentDate.innerHTML = formattedDate(date);
  displayTemp.innerHTML = temperature;
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" id="present-temperature-icon"/>`;
  conditions.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed} km/h`;

  getForecast(response.data.city);
}

function formattedDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurseday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} <br /> ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "2903bd515o84e51d2d0at09a3a53f67a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let presentCity = document.querySelector("#city-search-input");

  searchCity(presentCity.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "2903bd515o84e51d2d0at09a3a53f67a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastText = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastText =
        forecastText +
        `<div class="present-city-forecast" id="present-city-forecast">
      <div class="forecast-display-discs" id="forecast-details">
        <div id="forecast-date">${formatDay(day.time)}</div>
        <div id="forecast-temperature-value"> <strong>${Math.round(
          day.temperature.maximum
        )}ºC</strong> / ${Math.round(day.temperature.minimum)}ºC </div>
        <div id="forecast-temperature-icon"><img src="${
          day.condition.icon_url
        }" id="forecast-temperature-icon"/></div>
      </div>
        </div>
    `;
    }
  });

  let forecastPrediction = document.querySelector("#forecast-details");
  forecastPrediction.innerHTML = forecastText;
}

function revealMenu() {
  let menu = document.querySelector("#info-drop");
  menu.classList.toggle("revealFooterInfo");
}

function midnightArcadeTheme() {
  let body = document.querySelector("body");
  body.classList.toggle("midnightArcade");
}

let searchFormElement = document.querySelector("#city-search");
searchFormElement.addEventListener("submit", handleSearchSubmit);

let button = document.querySelector("#footer");
button.addEventListener("click", revealMenu);

button = document.querySelector("#midnight-arcade");
button.addEventListener("click", midnightArcadeTheme);
