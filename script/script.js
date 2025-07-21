let nameInput = document.querySelector(".nameInput");
let searchButton = document.querySelector(".searchButton");
let weatherHeading = document.querySelector(".weatherHeading");
let dhakaCity = "Dhaka";

// searchButton.addEventListener("click", ;

async function fetchWeather() {
  let cityName = nameInput.value;
  let code = "appid=8a7517651dd4e7c48271b7e997f92cad";
  let city = `q=${cityName || dhakaCity}`;
  let url = "https://api.openweathermap.org/data/2.5/weather?units=metric";

  let mainTemperatureValue = document.querySelector(".mainTemperatureValue");
  let mainFeelsLikeValue = document.querySelector(".mainFeelsLikeValue");
  let mainHumidityValue = document.querySelector(".mainHumidityValue");
  let mainPressureValue = document.querySelector(".mainPressureValue");
  let mainSeaLevelValue = document.querySelector(".mainSeaLevelValue");
  let mainGroundLevelValue = document.querySelector(".mainGroundLevelValue");
  // mani object all value
  let windSunWindSpeedValue = document.querySelector(".windSunWindSpeedValue");
  let windSunWindDirectionValue = document.querySelector(
    ".windSunWindDirectionValue"
  );
  let windSunGustValue = document.querySelector(".windSunGustValue");
  let windSunSunriseValue = document.querySelector(".windSunSunriseValue");
  let windSunSunsetValue = document.querySelector(".windSunSunsetValue");
  // wheather value
  let WeatherVisibilityValue = document.querySelector(".WeatherVisibilityValue");
  let WeatherCloudinessValue = document.querySelector(".WeatherCloudinessValue");
  let WeatherDescriptionValue = document.querySelector(".WeatherDescriptionValue");
  let WeatherValues = document.querySelector(".WeatherValues");

  // lon/lat side....

    let coordnatesTextOne = document.querySelector(".coordnatesTextOne");
    let coordnatesTextTwo = document.querySelector(".coordnatesTextTwo");



  try {
    let respons = await fetch(url + "&" + city + "&" + code);
    let data = await respons.json();

    function windDirection() {
      let direction;

      if (data.wind.deg >= 45 && data.wind.deg < 135) {
        direction = "East";
      } else if (data.wind.deg >= 135 && data.wind.deg < 225) {
        direction = "South";
      } else if (data.wind.deg >= 225 && data.wind.deg < 315) {
        direction = "West";
      } else {
        direction = "North";
      }
      return direction;
    }

    function sunRiseSet(timeStamp) {
      let time = new Date(timeStamp * 1000);
      let hour = time.getHours();
      let minutes = time.getMinutes();

      let ampm = hour >= 12 ? "Pm" : "Am";

      hour = hour % 12;
      hour = hour ? hour : 12;
     let min =  minutes.toString().padStart(2 , "0")
     let hours =  hour.toString().padStart(2 , "0")
      return `${hours} : ${min} ${ampm}`
    }

    if (data.cod !== 200) {
      weatherHeading.innerHTML = `City is not Found`;
    } else {
      weatherHeading.innerHTML = `Weather in ${data.name}`;
      mainTemperatureValue.innerHTML = `${Math.round(data.main.temp)}°C`;
      mainFeelsLikeValue.innerHTML = `${Math.round(data.main.feels_like)}°C`;
      mainHumidityValue.innerHTML = `${data.main.humidity}%`;
      mainPressureValue.innerHTML = `${data.main.pressure} hPa`;
      mainSeaLevelValue.innerHTML = `${data.main.sea_level} hPa`;
      mainGroundLevelValue.innerHTML = `${data.main.grnd_level} hPa`;
      // main value decelear...
      windSunWindSpeedValue.innerHTML = `${Math.round(
        data.wind.speed * 3.16
      )} km/h `;
      windSunGustValue.innerHTML = `${Math.round(data.wind.gust * 3.16)} km/h `;
      windSunWindDirectionValue.innerHTML = `${windDirection()}`;
      windSunSunriseValue.innerHTML = `${sunRiseSet(data.sys.sunrise)} `
      windSunSunsetValue.innerHTML = `${sunRiseSet(data.sys.sunset)}`
      // wind .....
      WeatherValues.innerHTML = `${data.weather[0].main}`
      WeatherDescriptionValue.innerHTML = `${data.weather[0].description}`
      WeatherCloudinessValue.innerHTML = `${data.clouds.all}%`
      WeatherVisibilityValue.innerHTML = `${Math.round(data.visibility / 1000)}km`
      // lon/lat...
      coordnatesTextOne.innerHTML = `Lat: ${data.coord.lat}`
      coordnatesTextTwo.innerHTML = `Lon: ${data.coord.lon }`

    }
    nameInput.value = "";
    console.log(data);
  } catch (error) {
    weatherHeading.innerHTML = `Something went wrong!`;
    console.error(error);
  }
}


window.addEventListener("load",function(){
  fetchWeather(dhakaCity)
})

searchButton.addEventListener("click",()=>{
  let cityName = nameInput.value.trim()
  fetchWeather(cityName)
  nameInput.value=""
})