//add code here
const time = document.getElementById('time');
const date = document.getElementById('date');
const currentWeatherItems = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const country = document.getElementById('country');
const weatherForecast = document.getElementById('weather-forecast');
const currentTemp = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const timeObject = new Date();
    const month = timeObject.getMonth();
    const date1 = timeObject.getDate();
    const day = timeObject.getDay();
    const hour = timeObject.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = timeObject.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    time.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    date.innerHTML = days[day] + ', ' + date1 + ' ' + months[month]
}, 1000)

var apiCall = '';
var apiKey = '814caebffc6d3c6785e7b749a2cfd919';

getCurrentLocationWeather();
function getCurrentLocationWeather() {
    navigator.geolocation.getCurrentPosition((success) => {

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`).then(res => res.json()).then(data => {

            displayCurrentWeather(data);
        })
    })
}


function displayCurrentWeather (data) {
    let {humidity, pressure, sunrise, sunset, windSpeed} = data.current;


    timezone.innerHTML = data.timezone;
    country.innerHTML = data.lat + 'N ' + data.lon + 'E '

    currentWeatherItems.innerHTML =
        ` <div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}</div>
   </div>
   <div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
   </div>
   <div class="weather-item">
    <div> Wind Speed</div>
    <div>${windSpeed}</div>
   </div>
   <div class="weather-item">
    <div> Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
   
   `;
    let weeklyForecast = ''
    data.daily.forEach((day, index) => {
        if (index == 0) {
            currentTemp.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <div class="temp">Night - ${day.temp.night}&#176; C</div>
            <div class="temp">Day - ${day.temp.day}&#176; C</div>
            </div>
             `
        } else {
            weeklyForecast +=
                `
        <div class="weather-forecast-item">
        <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
        <div class="temp">Night - ${day.temp.night}&#176; C</div>
        <div class="temp">Day - ${day.temp.day}&#176; C</div>
        </div>
        `
        }
    })

    weatherForecast.innerHTML = weeklyForecast;
}






