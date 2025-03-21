let windSpeedChart;

// Funktio päivittää tuulen nopeuskaavion
function updateWindSpeedChart(timestamp, windSpeed) {
    if (!windSpeedChart) {
        const ctx = document.getElementById('windSpeedChart').getContext('2d');
        windSpeedChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Tuulen nopeus (m/s)',
                    data: [],
                    borderColor: '#4e008e',
                    backgroundColor: 'rgba(78, 0, 142, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Päivitä kaavio uudella datalla
    windSpeedChart.data.labels.push(timestamp);
    windSpeedChart.data.datasets[0].data.push(windSpeed);
    windSpeedChart.update();
}
