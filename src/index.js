import './css/weather-icons.css';
import './css/weather-icons.min.css';
import { getWeather, getConditionIconClass, getMoonPhaseIconClass } from './weather';
import html from './template.html';
import './style.css';

let isFahrenheit = false;
let currentWeather;

function setFormListener() {
    const locationForm = document.querySelector('#location-form');
    locationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let location = locationForm.elements["location-input"].value.replace(/ /g,"+");
        getWeather(location).then(result => updateDisplay(result));
    });
}

function setTempToggleListener() {
    const toggle = document.querySelector('#temp-toggle');
    toggle.addEventListener('click', (event) => {
        isFahrenheit = !isFahrenheit;
        
        updateDisplay(currentWeather);
        updateTempUnitDisplay(isFahrenheit);
        console.log(isFahrenheit);
    });
}

function updateTempUnitDisplay(isFahrenheit) {
    const divs = document.querySelectorAll('.unit');
    for (let index = 0; index < divs.length; index++) {
        divs[index].innerHTML = isFahrenheit ? '°F' : '°C';
    }
}

window.onload = function() {
    document.body.innerHTML = html;

    let meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0');
    document.head.appendChild(meta);
    
    setFormListener();
    getWeather('Seoul').then(result => updateDisplay(result));
    console.log('hi');
    setTempToggleListener();
}

function updateDisplay(weather) {
    console.log(weather);
    currentWeather = weather;

    updateCurrentDisplay(weather);
    updateForecastDisplay(weather);

}

function updateCurrentDisplay(weather) {
    document.querySelector('#condition-icon').setAttribute('class', `wi ${getConditionIconClass(weather.current.condition.code, weather.current.is_day)}`);
    document.querySelector('#current-temperature').innerHTML = isFahrenheit ? weather.current.temp_f : weather.current.temp_c;
    document.querySelector('#condition-text').innerHTML = weather.current.condition.text;

    document.querySelector('#location-text').innerHTML = weather.location.name;
    document.querySelector('#datetime').innerHTML = weather.location.localtime.toLocaleString('en-GB', {hourCycle: 'h12', hour12: true, weekday:'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: weather.location.tz});
    document.querySelector('#last-updated').innerHTML = 'Last updated ' + weather.current.last_updated.toLocaleString('en-GB', {hourCycle: 'h12', hour12: true, timeStyle: 'short', timeZone: weather.location.tz});

    document.querySelector('#humidity').innerHTML = weather.current.humidity + '%';
    document.querySelector('#feels-like').innerHTML = isFahrenheit ? weather.current.feelslike_f : weather.current.feelslike_c;
    document.querySelector('#precipitation').innerHTML = weather.current.precip_mm + 'mm';
}

function updateForecastDisplay(weather, days = 3) {
    for (let index = 0; index < days; index++) {
        // loops through the forecast displays `forecast-${index}`
        const day = `forecast-${index}-`;

        document.querySelector(`#${day}date`).innerHTML = weather.forecast[index].date.toLocaleString('en-GB', {hourCycle: 'h12', hour12: true, weekday:'short', month: 'short', day: 'numeric', timeZone: weather.location.tz});
        document.querySelector(`#${day}moonphase`).setAttribute('class', `wi ${getMoonPhaseIconClass(weather.forecast[index].moon_phase)}`);

        document.querySelector(`#${day}condition-icon`).setAttribute('class', `wi ${getConditionIconClass(weather.forecast[index].condition.code)}`);
        document.querySelector(`#${day}condition-text`).innerHTML = weather.forecast[index].condition.text;

        document.querySelector(`#${day}maxtemp`).innerHTML = isFahrenheit ? weather.forecast[index].maxtemp_f : weather.forecast[index].maxtemp_c;
        document.querySelector(`#${day}mintemp`).innerHTML = isFahrenheit ? weather.forecast[index].mintemp_f : weather.forecast[index].mintemp_c;
        document.querySelector(`#${day}humidity`).innerHTML = weather.forecast[index].avghumidity + '%';
        document.querySelector(`#${day}chanceofrain`).innerHTML = weather.forecast[index].chance_of_rain + '%';
        document.querySelector(`#${day}precipitation`).innerHTML = weather.forecast[index].totalprecip_mm + 'mm';

        document.querySelector(`#${day}sunrise`).innerHTML = weather.forecast[index].sunrise.toLocaleString('en-GB', {hourCycle: 'h12', hour12: true, timeStyle: 'short', timeZone: weather.location.tz});
        document.querySelector(`#${day}sunset`).innerHTML = weather.forecast[index].sunset.toLocaleString('en-GB', {hourCycle: 'h12', hour12: true, timeStyle: 'short', timeZone: weather.location.tz});
    }
}
