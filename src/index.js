const API_KEY = '64cbe356cfaf4d1a9bb164616230310';
const API_URL = 'https://api.weatherapi.com/v1/current.json?';

async function getLocationData(location) {
    const response = await fetch(API_URL + 'key=' + API_KEY + '&q=' + location, {
        mode: 'cors'
    });
    const locationData = await response.json();
    console.log(locationData);
}