let now = new Date();

let currentTime = document.querySelector("#time");
let currentDay = document.querySelector("#today");

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentTime.innerHTML = `${hour}:${minutes}`;
currentDay.innerHTML = `${day}`;

function searchCity(city) {
  let apiKey = "8eb7f3f034269183b816909ef02f15a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", submit);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row row-cols-5">`;
  let days = ["Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       
         <div class="col">
           <div class="card-body">
             <h5 class="forecast-date">${day}</h5>
             <i class="fas fa-cloud-sun icon"></i>
             <p class="card-text">
               <span class="forecast-temperature-max">6°C</span>
               <span class="forecast-temperature-min"> 2°C</span>
             </p>
           </div>
         </div>
       `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8eb7f3f034269183b816909ef02f15a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind-speed").innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )}m/s`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#city").innerHTML = response.data.name;
  let iconElement = document.querySelector("#today-icon");
  iconElement.setAttribute("src", `src/${response.data.weather[0].icon}.svg`);

  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8eb7f3f034269183b816909ef02f15a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#button");
button.addEventListener("click", getCurrentLocation);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiustLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahreinheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahreinheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiustLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiustLink = document.querySelector("#celsius-link");
celsiustLink.addEventListener("click", showCelsiusTemp);

searchCity("Cracow");
