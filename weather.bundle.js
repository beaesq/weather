"use strict";
(self["webpackChunkweather_app"] = self["webpackChunkweather_app"] || []).push([["weather"],{

/***/ "./src/weather.js":
/*!************************!*\
  !*** ./src/weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getConditionIconClass: () => (/* binding */ getConditionIconClass),
/* harmony export */   getMoonPhaseIconClass: () => (/* binding */ getMoonPhaseIconClass),
/* harmony export */   getWeather: () => (/* binding */ getWeather)
/* harmony export */ });
const API_KEY = '64cbe356cfaf4d1a9bb164616230310';
const API_URL = 'https://api.weatherapi.com/v1/forecast.json?';

async function getWeather(location = 'valletta', days = '3') {
    const response = await fetch(API_URL + 'key=' + API_KEY + '&q=' + location + '&days=' + days + '&aqi=no&alerts=no', {
        mode: 'cors'
    });
    const data = await response.json();

    // console.log(data);

    // process data from WeatherAPI
    const weather = readWeatherData(data);
    return weather;
}

function readWeatherData(data) {
// processes WeatherAPI data for easier access
    let weather = {
        location: {
            name: data.location.name,
            localtime: new Date(data.location.localtime_epoch * 1000),
            country: data.location.country,
            tz: data.location.tz_id
        },
        current: {
            condition: {
                text: data.current.condition.text,
                code: getConditionCode(data.current.condition.code, data.current.is_day == 1 ? true : false)
            },
            feelslike_c: data.current.feelslike_c,
            feelslike_f: data.current.feelslike_f,
            humidity: data.current.humidity,
            is_day: data.current.is_day == 1 ? true : false,
            last_updated: new Date(data.current.last_updated_epoch * 1000),
            precip_in: data.current.precip_in,
            precip_mm: data.current.precip_mm,
            temp_c: data.current.temp_c,
            temp_f: data.current.temp_f
        },
        forecast: [
            {
                date: new Date(data.forecast.forecastday[0].date_epoch * 1000),
                sunrise: data.forecast.forecastday[0].astro.sunrise,
                sunset: data.forecast.forecastday[0].astro.sunset,
                moon_phase: data.forecast.forecastday[0].astro.moon_phase,
                avghumidity: data.forecast.forecastday[0].day.avghumidity,
                avgtemp_c: data.forecast.forecastday[0].day.avgtemp_c,
                avgtemp_f: data.forecast.forecastday[0].day.avgtemp_f,
                condition: {
                    text: data.forecast.forecastday[0].day.condition.text,
                    code: getConditionCode(data.forecast.forecastday[0].day.condition.code)
                },
                chance_of_rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
                maxtemp_c: data.forecast.forecastday[0].day.maxtemp_c,
                maxtemp_f: data.forecast.forecastday[0].day.maxtemp_f,
                mintemp_c: data.forecast.forecastday[0].day.mintemp_c,
                mintemp_f: data.forecast.forecastday[0].day.mintemp_f,
                totalprecip_in: data.forecast.forecastday[0].day.totalprecip_in,
                totalprecip_mm: data.forecast.forecastday[0].day.totalprecip_mm
            },
            {
                date: new Date(data.forecast.forecastday[1].date_epoch * 1000),
                sunrise: data.forecast.forecastday[1].astro.sunrise,
                sunset: data.forecast.forecastday[1].astro.sunset,
                moon_phase: data.forecast.forecastday[1].astro.moon_phase,
                avghumidity: data.forecast.forecastday[1].day.avghumidity,
                avgtemp_c: data.forecast.forecastday[1].day.avgtemp_c,
                avgtemp_f: data.forecast.forecastday[1].day.avgtemp_f,
                condition: {
                    text: data.forecast.forecastday[1].day.condition.text,
                    code: getConditionCode(data.forecast.forecastday[1].day.condition.code)
                },
                chance_of_rain: data.forecast.forecastday[1].day.daily_chance_of_rain,
                maxtemp_c: data.forecast.forecastday[1].day.maxtemp_c,
                maxtemp_f: data.forecast.forecastday[1].day.maxtemp_f,
                mintemp_c: data.forecast.forecastday[1].day.mintemp_c,
                mintemp_f: data.forecast.forecastday[1].day.mintemp_f,
                totalprecip_in: data.forecast.forecastday[1].day.totalprecip_in,
                totalprecip_mm: data.forecast.forecastday[1].day.totalprecip_mm
            },
            {
                date: new Date(data.forecast.forecastday[2].date_epoch * 1000),
                sunrise: data.forecast.forecastday[2].astro.sunrise,
                sunset: data.forecast.forecastday[2].astro.sunset,
                moon_phase: data.forecast.forecastday[2].astro.moon_phase,
                avghumidity: data.forecast.forecastday[2].day.avghumidity,
                avgtemp_c: data.forecast.forecastday[2].day.avgtemp_c,
                avgtemp_f: data.forecast.forecastday[2].day.avgtemp_f,
                condition: {
                    text: data.forecast.forecastday[2].day.condition.text,
                    code: getConditionCode(data.forecast.forecastday[2].day.condition.code)
                },
                chance_of_rain: data.forecast.forecastday[2].day.daily_chance_of_rain,
                maxtemp_c: data.forecast.forecastday[2].day.maxtemp_c,
                maxtemp_f: data.forecast.forecastday[2].day.maxtemp_f,
                mintemp_c: data.forecast.forecastday[2].day.mintemp_c,
                mintemp_f: data.forecast.forecastday[2].day.mintemp_f,
                totalprecip_in: data.forecast.forecastday[2].day.totalprecip_in,
                totalprecip_mm: data.forecast.forecastday[2].day.totalprecip_mm
            }
        ]
    };

    console.log(weather.forecast[2].condition.code);

    return weather;
}

function getConditionIconClass(code = 1000, isDay = true) {
// get the appropriate Weather icon from the condition code (icons from https://erikflowers.github.io/weather-icons/)
    switch (code) {
        case 1000:
            if (isDay) {
                return 'wi-day-sunny';
            } else {
                return 'wi-night-clear';
            }
        case 1003:
            if (isDay) {
                return 'wi-day-cloudy';
            } else {
                return 'wi-night-alt-cloudy';
            }  
        case 1063:
        case 1180:
            if (isDay) {
                return 'wi-day-showers';
            } else {
                return 'wi-night-alt-showers';
            } 
        case 1186:
        case 1192:
        case 1240:
        case 1243:
        case 1246:
            if (isDay) {
                return 'wi-day-rain';
            } else {
                return 'wi-night-alt-rain';
            } 
        case 1066:
        case 1072:
        case 1210:
        case 1216:
        case 1222:
        case 1255:
        case 1258:
            if (isDay) {
                return 'wi-day-snow';
            } else {
                return 'wi-night-alt-snow';
            }
        case 1069:
        case 1249:
        case 1252:
            if (isDay) {
                return 'wi-day-sleet';
            } else {
                return 'wi-night-alt-sleet';
            } 
        case 1261:
        case 1264:
            if (isDay) {
                return 'wi-day-hail';
            } else {
                return 'wi-night-alt-hail';
            } 
        case 1087:
            if (isDay) {
                return 'wi-day-lightning';
            } else {
                return 'wi-night-alt-lightning';
            } 
        case 1273:
            if (isDay) {
                return 'wi-day-thunderstorm';
            } else {
                return 'wi-night-alt-thunderstorm';
            } 
        case 1279:
            if (isDay) {
                return 'wi-day-snow-thunderstorm';
            } else {
                return 'wi-night-alt-snow-thunderstorm';
            } 
        case 1006:
        case 1009:
            return 'wi-cloudy';
        case 1030:
        case 1135:
        case 1147:
            return 'wi-fog';  
        case 1114:
        case 1117:
            return 'wi-snow-wind';  
        case 1150:
        case 1153:
        case 1168:
        case 1171:
            return 'wi-showers';
        case 1183:
        case 1189:
        case 1195:
        case 1198:
        case 1201:
            return 'wi-rain';
        case 1204:
        case 1207:
            return 'wi-sleet';
        case 1213:
        case 1219:
        case 1225:
            return 'wi-snow';
        case 1237:
            return 'wi-hail';
        case 1276:
            return 'wi-thunderstorm';
        case 1282:
            return 'wi-storm-showers';
        default:
            return 'wi-day-sunny';
    }
}

function getConditionCode(APICode) {
// convert WeatherAPI condition codes to local code
    return APICode; // hehe
}

function getMoonPhaseIconClass(phase = 'New Moon') {
    switch (phase) {
        case 'New Moon':
            return 'wi-moon-alt-new';
        case 'Waxing Crescent':
            return 'wi-moon-alt-waxing-crescent-3';
        case 'First Quarter':
            return 'wi-moon-alt-first-quarter';
        case 'Waxing Gibbous':
            return 'wi-moon-alt-waxing-gibbous-3';
        case 'Full Moon':
            return 'wi-moon-alt-full';
        case 'Waning Gibbous':
            return 'wi-moon-alt-waning-gibbous-3';
        case 'Last Quarter':
            return 'wi-moon-alt-third-quarter';
        case 'Waning Crescent':
            return 'wi-moon-alt-waning-crescent-3';
        default:
            return 'wi-moon-alt-new';
    }
}



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/weather.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3dlYXRoZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQVBJX0tFWSA9ICc2NGNiZTM1NmNmYWY0ZDFhOWJiMTY0NjE2MjMwMzEwJztcbmNvbnN0IEFQSV9VUkwgPSAnaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj8nO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxvY2F0aW9uID0gJ3ZhbGxldHRhJywgZGF5cyA9ICczJykge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goQVBJX1VSTCArICdrZXk9JyArIEFQSV9LRVkgKyAnJnE9JyArIGxvY2F0aW9uICsgJyZkYXlzPScgKyBkYXlzICsgJyZhcWk9bm8mYWxlcnRzPW5vJywge1xuICAgICAgICBtb2RlOiAnY29ycydcbiAgICB9KTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAvLyBwcm9jZXNzIGRhdGEgZnJvbSBXZWF0aGVyQVBJXG4gICAgY29uc3Qgd2VhdGhlciA9IHJlYWRXZWF0aGVyRGF0YShkYXRhKTtcbiAgICByZXR1cm4gd2VhdGhlcjtcbn1cblxuZnVuY3Rpb24gcmVhZFdlYXRoZXJEYXRhKGRhdGEpIHtcbi8vIHByb2Nlc3NlcyBXZWF0aGVyQVBJIGRhdGEgZm9yIGVhc2llciBhY2Nlc3NcbiAgICBsZXQgd2VhdGhlciA9IHtcbiAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgIG5hbWU6IGRhdGEubG9jYXRpb24ubmFtZSxcbiAgICAgICAgICAgIGxvY2FsdGltZTogbmV3IERhdGUoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWVfZXBvY2ggKiAxMDAwKSxcbiAgICAgICAgICAgIGNvdW50cnk6IGRhdGEubG9jYXRpb24uY291bnRyeSxcbiAgICAgICAgICAgIHR6OiBkYXRhLmxvY2F0aW9uLnR6X2lkXG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnQ6IHtcbiAgICAgICAgICAgIGNvbmRpdGlvbjoge1xuICAgICAgICAgICAgICAgIHRleHQ6IGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dCxcbiAgICAgICAgICAgICAgICBjb2RlOiBnZXRDb25kaXRpb25Db2RlKGRhdGEuY3VycmVudC5jb25kaXRpb24uY29kZSwgZGF0YS5jdXJyZW50LmlzX2RheSA9PSAxID8gdHJ1ZSA6IGZhbHNlKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZlZWxzbGlrZV9jOiBkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2MsXG4gICAgICAgICAgICBmZWVsc2xpa2VfZjogZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mLFxuICAgICAgICAgICAgaHVtaWRpdHk6IGRhdGEuY3VycmVudC5odW1pZGl0eSxcbiAgICAgICAgICAgIGlzX2RheTogZGF0YS5jdXJyZW50LmlzX2RheSA9PSAxID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdF91cGRhdGVkOiBuZXcgRGF0ZShkYXRhLmN1cnJlbnQubGFzdF91cGRhdGVkX2Vwb2NoICogMTAwMCksXG4gICAgICAgICAgICBwcmVjaXBfaW46IGRhdGEuY3VycmVudC5wcmVjaXBfaW4sXG4gICAgICAgICAgICBwcmVjaXBfbW06IGRhdGEuY3VycmVudC5wcmVjaXBfbW0sXG4gICAgICAgICAgICB0ZW1wX2M6IGRhdGEuY3VycmVudC50ZW1wX2MsXG4gICAgICAgICAgICB0ZW1wX2Y6IGRhdGEuY3VycmVudC50ZW1wX2ZcbiAgICAgICAgfSxcbiAgICAgICAgZm9yZWNhc3Q6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRhdGVfZXBvY2ggKiAxMDAwKSxcbiAgICAgICAgICAgICAgICBzdW5yaXNlOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnJpc2UsXG4gICAgICAgICAgICAgICAgc3Vuc2V0OiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnNldCxcbiAgICAgICAgICAgICAgICBtb29uX3BoYXNlOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLm1vb25fcGhhc2UsXG4gICAgICAgICAgICAgICAgYXZnaHVtaWRpdHk6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmF2Z2h1bWlkaXR5LFxuICAgICAgICAgICAgICAgIGF2Z3RlbXBfYzogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuYXZndGVtcF9jLFxuICAgICAgICAgICAgICAgIGF2Z3RlbXBfZjogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuYXZndGVtcF9mLFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5jb25kaXRpb24udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgY29kZTogZ2V0Q29uZGl0aW9uQ29kZShkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5jb25kaXRpb24uY29kZSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoYW5jZV9vZl9yYWluOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbixcbiAgICAgICAgICAgICAgICBtYXh0ZW1wX2M6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfYyxcbiAgICAgICAgICAgICAgICBtYXh0ZW1wX2Y6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfZixcbiAgICAgICAgICAgICAgICBtaW50ZW1wX2M6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfYyxcbiAgICAgICAgICAgICAgICBtaW50ZW1wX2Y6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfZixcbiAgICAgICAgICAgICAgICB0b3RhbHByZWNpcF9pbjogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkudG90YWxwcmVjaXBfaW4sXG4gICAgICAgICAgICAgICAgdG90YWxwcmVjaXBfbW06IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LnRvdGFscHJlY2lwX21tXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF0ZV9lcG9jaCAqIDEwMDApLFxuICAgICAgICAgICAgICAgIHN1bnJpc2U6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uYXN0cm8uc3VucmlzZSxcbiAgICAgICAgICAgICAgICBzdW5zZXQ6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uYXN0cm8uc3Vuc2V0LFxuICAgICAgICAgICAgICAgIG1vb25fcGhhc2U6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uYXN0cm8ubW9vbl9waGFzZSxcbiAgICAgICAgICAgICAgICBhdmdodW1pZGl0eTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkuYXZnaHVtaWRpdHksXG4gICAgICAgICAgICAgICAgYXZndGVtcF9jOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5hdmd0ZW1wX2MsXG4gICAgICAgICAgICAgICAgYXZndGVtcF9mOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5hdmd0ZW1wX2YsXG4gICAgICAgICAgICAgICAgY29uZGl0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5LmNvbmRpdGlvbi50ZXh0LFxuICAgICAgICAgICAgICAgICAgICBjb2RlOiBnZXRDb25kaXRpb25Db2RlKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5LmNvbmRpdGlvbi5jb2RlKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hhbmNlX29mX3JhaW46IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluLFxuICAgICAgICAgICAgICAgIG1heHRlbXBfYzogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWF4dGVtcF9jLFxuICAgICAgICAgICAgICAgIG1heHRlbXBfZjogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWF4dGVtcF9mLFxuICAgICAgICAgICAgICAgIG1pbnRlbXBfYzogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWludGVtcF9jLFxuICAgICAgICAgICAgICAgIG1pbnRlbXBfZjogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWludGVtcF9mLFxuICAgICAgICAgICAgICAgIHRvdGFscHJlY2lwX2luOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS50b3RhbHByZWNpcF9pbixcbiAgICAgICAgICAgICAgICB0b3RhbHByZWNpcF9tbTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkudG90YWxwcmVjaXBfbW1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXRlX2Vwb2NoICogMTAwMCksXG4gICAgICAgICAgICAgICAgc3VucmlzZTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5hc3Ryby5zdW5yaXNlLFxuICAgICAgICAgICAgICAgIHN1bnNldDogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5hc3Ryby5zdW5zZXQsXG4gICAgICAgICAgICAgICAgbW9vbl9waGFzZTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5hc3Ryby5tb29uX3BoYXNlLFxuICAgICAgICAgICAgICAgIGF2Z2h1bWlkaXR5OiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5hdmdodW1pZGl0eSxcbiAgICAgICAgICAgICAgICBhdmd0ZW1wX2M6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5LmF2Z3RlbXBfYyxcbiAgICAgICAgICAgICAgICBhdmd0ZW1wX2Y6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5LmF2Z3RlbXBfZixcbiAgICAgICAgICAgICAgICBjb25kaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkuY29uZGl0aW9uLnRleHQsXG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IGdldENvbmRpdGlvbkNvZGUoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkuY29uZGl0aW9uLmNvZGUpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGFuY2Vfb2ZfcmFpbjogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW4sXG4gICAgICAgICAgICAgICAgbWF4dGVtcF9jOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5tYXh0ZW1wX2MsXG4gICAgICAgICAgICAgICAgbWF4dGVtcF9mOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5tYXh0ZW1wX2YsXG4gICAgICAgICAgICAgICAgbWludGVtcF9jOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5taW50ZW1wX2MsXG4gICAgICAgICAgICAgICAgbWludGVtcF9mOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5taW50ZW1wX2YsXG4gICAgICAgICAgICAgICAgdG90YWxwcmVjaXBfaW46IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5LnRvdGFscHJlY2lwX2luLFxuICAgICAgICAgICAgICAgIHRvdGFscHJlY2lwX21tOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS50b3RhbHByZWNpcF9tbVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGNvbnNvbGUubG9nKHdlYXRoZXIuZm9yZWNhc3RbMl0uY29uZGl0aW9uLmNvZGUpO1xuXG4gICAgcmV0dXJuIHdlYXRoZXI7XG59XG5cbmZ1bmN0aW9uIGdldENvbmRpdGlvbkljb25DbGFzcyhjb2RlID0gMTAwMCwgaXNEYXkgPSB0cnVlKSB7XG4vLyBnZXQgdGhlIGFwcHJvcHJpYXRlIFdlYXRoZXIgaWNvbiBmcm9tIHRoZSBjb25kaXRpb24gY29kZSAoaWNvbnMgZnJvbSBodHRwczovL2VyaWtmbG93ZXJzLmdpdGh1Yi5pby93ZWF0aGVyLWljb25zLylcbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgICAgY2FzZSAxMDAwOlxuICAgICAgICAgICAgaWYgKGlzRGF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd3aS1kYXktc3VubnknO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3dpLW5pZ2h0LWNsZWFyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAxMDAzOlxuICAgICAgICAgICAgaWYgKGlzRGF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd3aS1kYXktY2xvdWR5JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd3aS1uaWdodC1hbHQtY2xvdWR5JztcbiAgICAgICAgICAgIH0gIFxuICAgICAgICBjYXNlIDEwNjM6XG4gICAgICAgIGNhc2UgMTE4MDpcbiAgICAgICAgICAgIGlmIChpc0RheSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnd2ktZGF5LXNob3dlcnMnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3dpLW5pZ2h0LWFsdC1zaG93ZXJzJztcbiAgICAgICAgICAgIH0gXG4gICAgICAgIGNhc2UgMTE4NjpcbiAgICAgICAgY2FzZSAxMTkyOlxuICAgICAgICBjYXNlIDEyNDA6XG4gICAgICAgIGNhc2UgMTI0MzpcbiAgICAgICAgY2FzZSAxMjQ2OlxuICAgICAgICAgICAgaWYgKGlzRGF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd3aS1kYXktcmFpbic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnd2ktbmlnaHQtYWx0LXJhaW4nO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgY2FzZSAxMDY2OlxuICAgICAgICBjYXNlIDEwNzI6XG4gICAgICAgIGNhc2UgMTIxMDpcbiAgICAgICAgY2FzZSAxMjE2OlxuICAgICAgICBjYXNlIDEyMjI6XG4gICAgICAgIGNhc2UgMTI1NTpcbiAgICAgICAgY2FzZSAxMjU4OlxuICAgICAgICAgICAgaWYgKGlzRGF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd3aS1kYXktc25vdyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnd2ktbmlnaHQtYWx0LXNub3cnO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIDEwNjk6XG4gICAgICAgIGNhc2UgMTI0OTpcbiAgICAgICAgY2FzZSAxMjUyOlxuICAgICAgICAgICAgaWYgKGlzRGF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd3aS1kYXktc2xlZXQnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3dpLW5pZ2h0LWFsdC1zbGVldCc7XG4gICAgICAgICAgICB9IFxuICAgICAgICBjYXNlIDEyNjE6XG4gICAgICAgIGNhc2UgMTI2NDpcbiAgICAgICAgICAgIGlmIChpc0RheSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnd2ktZGF5LWhhaWwnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3dpLW5pZ2h0LWFsdC1oYWlsJztcbiAgICAgICAgICAgIH0gXG4gICAgICAgIGNhc2UgMTA4NzpcbiAgICAgICAgICAgIGlmIChpc0RheSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnd2ktZGF5LWxpZ2h0bmluZyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnd2ktbmlnaHQtYWx0LWxpZ2h0bmluZyc7XG4gICAgICAgICAgICB9IFxuICAgICAgICBjYXNlIDEyNzM6XG4gICAgICAgICAgICBpZiAoaXNEYXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3dpLWRheS10aHVuZGVyc3Rvcm0nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3dpLW5pZ2h0LWFsdC10aHVuZGVyc3Rvcm0nO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgY2FzZSAxMjc5OlxuICAgICAgICAgICAgaWYgKGlzRGF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd3aS1kYXktc25vdy10aHVuZGVyc3Rvcm0nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3dpLW5pZ2h0LWFsdC1zbm93LXRodW5kZXJzdG9ybSc7XG4gICAgICAgICAgICB9IFxuICAgICAgICBjYXNlIDEwMDY6XG4gICAgICAgIGNhc2UgMTAwOTpcbiAgICAgICAgICAgIHJldHVybiAnd2ktY2xvdWR5JztcbiAgICAgICAgY2FzZSAxMDMwOlxuICAgICAgICBjYXNlIDExMzU6XG4gICAgICAgIGNhc2UgMTE0NzpcbiAgICAgICAgICAgIHJldHVybiAnd2ktZm9nJzsgIFxuICAgICAgICBjYXNlIDExMTQ6XG4gICAgICAgIGNhc2UgMTExNzpcbiAgICAgICAgICAgIHJldHVybiAnd2ktc25vdy13aW5kJzsgIFxuICAgICAgICBjYXNlIDExNTA6XG4gICAgICAgIGNhc2UgMTE1MzpcbiAgICAgICAgY2FzZSAxMTY4OlxuICAgICAgICBjYXNlIDExNzE6XG4gICAgICAgICAgICByZXR1cm4gJ3dpLXNob3dlcnMnO1xuICAgICAgICBjYXNlIDExODM6XG4gICAgICAgIGNhc2UgMTE4OTpcbiAgICAgICAgY2FzZSAxMTk1OlxuICAgICAgICBjYXNlIDExOTg6XG4gICAgICAgIGNhc2UgMTIwMTpcbiAgICAgICAgICAgIHJldHVybiAnd2ktcmFpbic7XG4gICAgICAgIGNhc2UgMTIwNDpcbiAgICAgICAgY2FzZSAxMjA3OlxuICAgICAgICAgICAgcmV0dXJuICd3aS1zbGVldCc7XG4gICAgICAgIGNhc2UgMTIxMzpcbiAgICAgICAgY2FzZSAxMjE5OlxuICAgICAgICBjYXNlIDEyMjU6XG4gICAgICAgICAgICByZXR1cm4gJ3dpLXNub3cnO1xuICAgICAgICBjYXNlIDEyMzc6XG4gICAgICAgICAgICByZXR1cm4gJ3dpLWhhaWwnO1xuICAgICAgICBjYXNlIDEyNzY6XG4gICAgICAgICAgICByZXR1cm4gJ3dpLXRodW5kZXJzdG9ybSc7XG4gICAgICAgIGNhc2UgMTI4MjpcbiAgICAgICAgICAgIHJldHVybiAnd2ktc3Rvcm0tc2hvd2Vycyc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gJ3dpLWRheS1zdW5ueSc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRDb25kaXRpb25Db2RlKEFQSUNvZGUpIHtcbi8vIGNvbnZlcnQgV2VhdGhlckFQSSBjb25kaXRpb24gY29kZXMgdG8gbG9jYWwgY29kZVxuICAgIHJldHVybiBBUElDb2RlOyAvLyBoZWhlXG59XG5cbmZ1bmN0aW9uIGdldE1vb25QaGFzZUljb25DbGFzcyhwaGFzZSA9ICdOZXcgTW9vbicpIHtcbiAgICBzd2l0Y2ggKHBoYXNlKSB7XG4gICAgICAgIGNhc2UgJ05ldyBNb29uJzpcbiAgICAgICAgICAgIHJldHVybiAnd2ktbW9vbi1hbHQtbmV3JztcbiAgICAgICAgY2FzZSAnV2F4aW5nIENyZXNjZW50JzpcbiAgICAgICAgICAgIHJldHVybiAnd2ktbW9vbi1hbHQtd2F4aW5nLWNyZXNjZW50LTMnO1xuICAgICAgICBjYXNlICdGaXJzdCBRdWFydGVyJzpcbiAgICAgICAgICAgIHJldHVybiAnd2ktbW9vbi1hbHQtZmlyc3QtcXVhcnRlcic7XG4gICAgICAgIGNhc2UgJ1dheGluZyBHaWJib3VzJzpcbiAgICAgICAgICAgIHJldHVybiAnd2ktbW9vbi1hbHQtd2F4aW5nLWdpYmJvdXMtMyc7XG4gICAgICAgIGNhc2UgJ0Z1bGwgTW9vbic6XG4gICAgICAgICAgICByZXR1cm4gJ3dpLW1vb24tYWx0LWZ1bGwnO1xuICAgICAgICBjYXNlICdXYW5pbmcgR2liYm91cyc6XG4gICAgICAgICAgICByZXR1cm4gJ3dpLW1vb24tYWx0LXdhbmluZy1naWJib3VzLTMnO1xuICAgICAgICBjYXNlICdMYXN0IFF1YXJ0ZXInOlxuICAgICAgICAgICAgcmV0dXJuICd3aS1tb29uLWFsdC10aGlyZC1xdWFydGVyJztcbiAgICAgICAgY2FzZSAnV2FuaW5nIENyZXNjZW50JzpcbiAgICAgICAgICAgIHJldHVybiAnd2ktbW9vbi1hbHQtd2FuaW5nLWNyZXNjZW50LTMnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICd3aS1tb29uLWFsdC1uZXcnO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgZ2V0V2VhdGhlciwgZ2V0Q29uZGl0aW9uSWNvbkNsYXNzLCBnZXRNb29uUGhhc2VJY29uQ2xhc3MgfTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=