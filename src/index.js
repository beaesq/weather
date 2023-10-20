import './css/weather-icons.css';
import './css/weather-icons.min.css';
import { getForecast, getConditionIconClass } from './weather';


getForecast('new+york');

document.body.innerHTML = `<i class="wi ${getConditionIconClass(1003, true)}"></i>`;