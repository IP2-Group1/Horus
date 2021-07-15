s//add code here
const time = document.getElementById('time');
const date = document.getElementById('date');
const currentWeatherItems = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const country = document.getElementById('country');
const weatherForecast = document.getElementById('weather-forecast');
const currentTemp = document.getElementById('current-temp');

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >=13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const aMpM = hour >=12 ? 'PM' : 'AM';

    time.innerHTML = hoursIn12HrFormat + ':'+minutes+ ' ' + '<span id = "am-pm>"$(ampm)</span>'
},1000)
