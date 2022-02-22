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

function showTemperature(response) {
  console.log(response.data);

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
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

searchCity("Cracow");
