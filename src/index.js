import './css/weather-icons.css';
import './css/weather-icons.min.css';
import { getForecast, getConditionIconClass, getMoonPhaseIconClass } from './weather';
import html from './template.html';

function setFormListener() {
    const locationForm = document.querySelector('#location-form');
    locationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let location = locationForm.elements["location-input"].value.replace(/ /g,"+");
        getForecast(location).then(result => console.log(result));
    });
}

window.onload = function() {
    console.log('hi');
    document.body.innerHTML = html;
    setFormListener();
}
// document.body.innerHTML = `<i class="wi ${getConditionIconClass(1003, true)}"></i>`;