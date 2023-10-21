import './css/weather-icons.css';
import './css/weather-icons.min.css';
import { getWeather, getConditionIconClass, getMoonPhaseIconClass } from './weather';
import html from './template.html';

let isFahrenheit = false;

function setFormListener() {
    const locationForm = document.querySelector('#location-form');
    locationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let location = locationForm.elements["location-input"].value.replace(/ /g,"+");
        getWeather(location).then(result => updateDisplay(result));
    });
}

window.onload = function() {
    document.body.innerHTML = html;
    setFormListener();
    getWeather('Seoul').then(result => updateDisplay(result));
    console.log('hi');
}

function updateDisplay(weather) {
    console.log(weather);

    updateCurrentDisplay(weather);

}

function updateCurrentDisplay(weather) {
    document.querySelector('#condition-icon').setAttribute('class', `wi ${getConditionIconClass(weather.current.condition.code, weather.current.is_day)}`);
    document.querySelector('#current-temperature').innerHTML = isFahrenheit ? weather.current.temp_f : weather.current.temp_c;
    document.querySelector('#condition-text').innerHTML = weather.current.condition.text;

    document.querySelector('#location-text').innerHTML = weather.location.name;
    document.querySelector('#datetime').innerHTML = weather.location.localtime.toLocaleString('en-GB', {hourCycle: 'h12', hour12: true, weekday:'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: weather.location.tz});
    document.querySelector('#last-updated').innerHTML = weather.current.last_updated.toLocaleString('en-GB', {hourCycle: 'h12', hour12: true, timeStyle: 'short', timeZone: weather.location.tz});

    document.querySelector('#humidity').innerHTML = weather.current.humidity + '%';
    document.querySelector('#feels-like').innerHTML = isFahrenheit ? weather.current.feelslike_f : weather.current.feelslike_c;
    document.querySelector('#precipitation').innerHTML = weather.current.precip_mm + 'mm';
}


// document.body.innerHTML = `<i class="wi ${getConditionIconClass(1003, true)}"></i>`;