const apiKey = "bafd9114a85886bcaca3eaa16e894f04";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=Vasai";

async function checkWeather() {
    const respone = await fetch(apiUrl + `&appid=${apiKey}`);
    let data = await respone.json();
    console.log(data);

    // location and temperature
    document.querySelector('.location-name').innerHTML = data.name;
    document.querySelector('.temperature').innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;

    // feels like..
    document.querySelector('.feels_like').innerHTML = "Feels like " + `${Math.round(data.main.feels_like)}<sup>°C</sup>`;

    // maximum and minimum temperature
    document.querySelector('.max').innerHTML = `${Math.round(data.main.temp_max)}<sup>°C</sup>`;
    document.querySelector('.min').innerHTML = `${Math.round(data.main.temp_min)}<sup>°C</sup>`;

    // humidity, wind-speed and visibility
    document.querySelector('.humid').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

    const visibilityInKm = (data.visibility / 1000).toFixed(2);
    document.querySelector('.visible').innerHTML = visibilityInKm + " km";

    // sunrise and sunset
    const sunriseTime = convertUnixTo12HrFormat(data.sys.sunrise);
    const sunsetTime = convertUnixTo12HrFormat(data.sys.sunset);

    document.querySelector('.rise').innerHTML = sunriseTime;
    document.querySelector('.set').innerHTML = sunsetTime;

    function convertUnixTo12HrFormat(unixTime) {
        const date = new Date(unixTime * 1000); // Convert to milliseconds
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format, '0' becomes '12'
        return `${hours}:${minutes} ${ampm}`;
    }
}

checkWeather();