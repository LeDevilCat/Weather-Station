async function fetchWeatherData() {
    try {
        const response = await fetch('http://your-api-endpoint.com/weather');
        const data = await response.json();

        document.getElementById('wind-speed').textContent = data.windSpeed.toFixed(1);
        document.getElementById('wind-direction').textContent = data.windDirection;

        updateWindSpeedChart(data.windSpeedHistory);
        updateWindDirectionChart(data.windDirectionHistory);
    } catch (error) {
        console.error('Virhe säätietojen hakemisessa:', error);
    }
}

setInterval(fetchWeatherData, 5000);
fetchWeatherData();
