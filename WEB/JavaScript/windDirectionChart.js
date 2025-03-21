let windDirectionChart;

// Funktio päivittää tuulen suuntakaavion
function updateWindDirectionChart(windDirection) {
    if (!windDirectionChart) {
        const ctx = document.getElementById('windDirectionChart').getContext('2d');
        windDirectionChart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['Pohjoinen', 'Koillinen', 'Itä', 'Kaakko', 'Etelä', 'Lounas', 'Länsi', 'Luode'],
                datasets: [{
                    label: 'Tuulen suunta',
                    data: Array(8).fill(0), // Aloitetaan tyhjällä datalla
                    backgroundColor: [
                        '#4e008e', '#82c8f0', '#f5a5c8', '#ffdca5',
                        '#c3b9d7', '#cf286f', '#7dcdbe', '#c8c8c8'
                    ]
                }]
            },
            options: {
                responsive: true,
                startAngle: -Math.PI / 8, // Asetetaan pohjoinen osoittamaan ylös keskiviivalla
                scales: {
                    r: {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            }
        });
    }

    // Muutetaan asteet (0-360) indeksiksi (0-7)
    const index = Math.floor((windDirection % 360) / 45);
    windDirectionChart.data.datasets[0].data[index] += 1; // Lisätään frekvenssiä
    windDirectionChart.update();
}
