const time = document.getElementById('time');
const date = document.getElementById('date');
const currentWeatherItems = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const country = document.getElementById('country');
const weatherForecast = document.getElementById('weather-forecast');
const currentTemp = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getTime(data) {
    setInterval(() => {
    const timeObject = new Date();
    var localTime = timeObject.getTime();
    var localOffset = timeObject.getTimezoneOffset() * 6000;
    var utc = localTime + localOffset;
    var cityTime = utc + (1000 * data.city.timezone);
    var cityDate = new Date(cityTime);
    const month = cityDate.getMonth();
    const date1 = cityDate.getDate();
    const day = cityDate.getDay();
    const hour = cityDate.getHours();
    const hoursIn12HrFormat = hour >=13 ? hour % 12 : hour
    const minutes = cityDate.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    time.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':'+ (minutes < 10 ? '0'+minutes : minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    date.innerHTML = days[day] + ', ' + date1+ ' ' + months[month]
},1000)
}





function getCityWeather() {
    var city = document.getElementById('city').value;
    var apiKey = '814caebffc6d3c6785e7b749a2cfd919';
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`).then(res => res.json()).then(data => {
        console.log(data);
        displayWeatherData(data);
        getTime(data);
    })

    
}

function displayWeatherData(data) {
    timezone.innerHTML = data.city.name + ', ' + data.city.country;
    country.innerHTML = data.city.coord.lat +' N ' + data.city.coord.lon + ' E ';

    currentWeatherItems.innerHTML = 
    ` <div class="weather-item">
    <div>Population</div>
    <div>${data.city.population}</div>
   </div>
   <div class="weather-item">
    <div>Pressure</div>
    <div>${data.list[0].main.pressure}</div>
   </div>
   <div class="weather-item">
    <div>Humidity</div>
    <div>${data.list[0].main.humidity}</div>
   </div>
   <div class="weather-item">
    <div> Sunrise</div>
    <div>${window.moment(data.city.sunrise*1000).format('HH:mm a')}</div>
   
   `;

//    currentTemp.innerHTML = `
//             <img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
//             <div class="other">
//             <div class="day">${window.moment(data.list[0].dt * 1000).format('ddd')}</div>
//             <div class="temp">Night - ${data.list[0].main.temp_min}&#176; C</div>
//             <div class="temp">Day - ${data.list[0].main.temp_max}&#176; C</div>
//             </div>
//    `

   let fiveDayForecast = '';

   for (let index = 0; index <=  32 ; index= index+8) {
       fiveDayForecast += 
       `
       <div class="weather-forecast-item">
        <div class="day">${window.moment(data.list[index].dt*1000).format('ddd')}</div>
        <img src="http://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
        <div class="temp">Night - ${data.list[index].main.temp_min}&#176; C</div>
        <div class="temp">Day - ${data.list[index].main.temp_max}&#176; C</div>
        </div>
       `
       
   }
   weatherForecast.innerHTML = fiveDayForecast;
}

