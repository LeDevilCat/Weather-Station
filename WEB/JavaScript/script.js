const API_KEY = 'f34226b8317feebe5c91ec105e324c0c';
const CITY = 'Tampere';
const UPDATE_INTERVAL = 15 * 60 * 1000; // 15 minuuttia
const DATA_RETENTION_PERIOD = 4 * 60 * 60 * 1000; // 4 tuntia

// Funktio säätietojen hakemiseen OpenWeatherMapista
async function fetchWeatherData() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        // Haetaan tuulitiedot
        const windSpeed = data.wind.speed; // Tuulen nopeus m/s
        const windDirection = data.wind.deg; // Tuulen suunta asteina
        const timestamp = new Date().toISOString(); // Nykyinen aika aikaleimana

        // Päivitetään käyttöliittymän elementit
        document.getElementById('wind-speed').textContent = windSpeed.toFixed(1);
        document.getElementById('wind-direction').textContent = degreesToCompass(windDirection);

        // Päivitetään kaavioiden dataa
        updateWindSpeedChart(timestamp, windSpeed);
        updateWindDirectionChart(windDirection);
        updateWindSpeedCompassChart(windDirection, windSpeed);

        // Tallenna data localStorageen
        saveDataToLocalStorage(timestamp, windSpeed, windDirection);

        console.log("Päivitetyt tuulitiedot:", windSpeed, windDirection);
    } catch (error) {
        console.error("Virhe säätietojen hakemisessa:", error);
    }
}

// Muuntaa asteet kompassisuunniksi suomeksi
function degreesToCompass(degrees) {
    const compassPoints = ['Pohjoinen', 'Koillinen', 'Itä', 'Kaakko', 'Etelä', 'Lounas', 'Länsi', 'Luode'];
    const index = Math.round(degrees / 45) % 8;
    return compassPoints[index];
}

// Tallenna data localStorageen
function saveDataToLocalStorage(timestamp, windSpeed, windDirection) {
    const data = JSON.parse(localStorage.getItem('weatherData')) || [];
    data.push({ timestamp, windSpeed, windDirection });

    // Poista vanhentunut data
    const cutoffTime = Date.now() - DATA_RETENTION_PERIOD;
    const filteredData = data.filter(entry => new Date(entry.timestamp).getTime() > cutoffTime);

    localStorage.setItem('weatherData', JSON.stringify(filteredData));
}

// Lataa data localStoragesta
function loadDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('weatherData')) || [];
    data.forEach(entry => {
        updateWindSpeedChart(entry.timestamp, entry.windSpeed);
        updateWindDirectionChart(entry.windDirection);
        updateWindSpeedCompassChart(entry.windDirection, entry.windSpeed);
    });
}

// Haetaan uudet tiedot 15 minuutin välein
setInterval(fetchWeatherData, UPDATE_INTERVAL);
fetchWeatherData();
loadDataFromLocalStorage();
