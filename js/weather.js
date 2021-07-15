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
    const hoursIn12HrFormat = hour >=13 ? hour % 12 : hour
    const minutes = timeObject.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    time.innerHTML = hoursIn12HrFormat + ':'+ minutes+ ' ' + `<span id="am-pm">${ampm}</span>`

    date.innerHTML = days[day] + ', ' + date1+ ' ' + months[month]
},1000)
