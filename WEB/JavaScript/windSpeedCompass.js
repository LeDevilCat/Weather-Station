let windSpeedCompassChart;

// Funktio päivittää tuulen nopeuskompassikaavion
function updateWindSpeedCompassChart(windDirection, windSpeed) {
    const ctx = document.getElementById('windSpeedCompass').getContext('2d');

    // Muuntaa asteet (0-360) indeksiksi (0-7) kompassisuunnille
    const index = Math.floor((windDirection % 360) / 45);

    // Luo uuden datasetin, jossa kaikilla arvoilla on pieni perusarvo (neulan vaikutelman luomiseksi)
    let windSpeedData = Array(8).fill(0.5); // Pieni oletusarvo neulan vaikutelman luomiseksi

    // Aseta todellinen tuulen nopeus oikeaan suuntaan
    windSpeedData[index] = windSpeed;

    // Säädä maksiminopeus lähimpään 10 m/s:iin
    const maxSpeed = Math.ceil(windSpeed / 10) * 10 || 10; // Varmistaa vähintään 10 m/s maksiminopeuden

    if (!windSpeedCompassChart) {
        // Luo tutka-kaavio, jos sitä ei vielä ole
        windSpeedCompassChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Pohjoinen', 'Koillinen', 'Itä', 'Kaakko', 'Etelä', 'Lounas', 'Länsi', 'Luode'],
                datasets: [{
                    label: 'Tuulen nopeus (m/s)',
                    data: windSpeedData,
                    backgroundColor: 'rgba(78, 0, 142, 0.2)',
                    borderColor: '#4e008e',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        suggestedMax: maxSpeed, // Säädä maksimi dynaamisesti
                        ticks: {
                            stepSize: 2 // Määrittää ympyröiden välin
                        }
                    }
                }
            }
        });
    } else {
        // Päivitä kaavion data dynaamisesti
        windSpeedCompassChart.data.datasets[0].data = windSpeedData;
        windSpeedCompassChart.options.scales.r.suggestedMax = maxSpeed; // Päivitä maksimi dynaamisesti
        windSpeedCompassChart.update();
    }
}
