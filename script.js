const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const useCurrLocBtn = document.querySelector(".currLocation button");
const apiKey = "e5006d321e223d6466d73c2544ab009e";
async function checkWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=${apiKey}&units=metric&lang=en`
  );
  return await response.json();
}
async function checkWeatherLatLong(lat, long) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${long}&appid=${apiKey}&units=metric&lang=en`
  );
  return await response.json();
}
function commontask(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = data.main.temp + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "images/snow.png";
  }
  document.querySelector(".weather").style.display = "block";
}
searchBtn.addEventListener("click", async () => {
  const data = await checkWeather(searchBox.value);
  commontask(data);
});
async function gotLocation(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const data = await checkWeatherLatLong(lat, long);
  commontask(data);
}
useCurrLocBtn.addEventListener("click", async () => {
  navigator.geolocation.getCurrentPosition(gotLocation);
});
