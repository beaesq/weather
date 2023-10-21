const API_KEY = '64cbe356cfaf4d1a9bb164616230310';
const API_URL = 'https://api.weatherapi.com/v1/forecast.json?';

async function getForecast(location = 'valletta', days = '3') {
    const response = await fetch(API_URL + 'key=' + API_KEY + '&q=' + location + '&days=' + days + '&aqi=no&alerts=no', {
        mode: 'cors'
    });
    const data = await response.json();

    // console.log(data);

    // process data from WeatherAPI
    const weather = readForecastData(data);
    return weather;
}

function readForecastData(data) {
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

export { getForecast, getConditionIconClass};