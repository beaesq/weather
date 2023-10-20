import './css/weather-icons.css';
import './css/weather-icons.min.css';
import { getForecast, getConditionIconClass } from './weather';

function displayForm() {
    let form = document.createElement('form');
    form.setAttribute('id', 'location-form');

    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'location');
    input.setAttribute('name', 'location');
    form.appendChild(input);

    let button = document.createElement('button');
    button.setAttribute('type', 'submit')
    button.innerHTML = 'Search';
    form.appendChild(button);

    document.body.appendChild(form);

    const locationForm = document.querySelector('#location-form');
    locationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let location = locationForm.elements["location"].value.replace(/ /g,"+");
        console.log(getForecast(location));
    });
}

getForecast('new+york');

displayForm();

// document.body.innerHTML = `<i class="wi ${getConditionIconClass(1003, true)}"></i>`;