function updateWindSpeedChart(speedData) {
    const ctx = document.getElementById('windSpeedChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: speedData.timestamps,
            datasets: [{
                label: 'Tuulen nopeus (m/s)',
                data: speedData.values,
                borderColor: '#4e008e',
                backgroundColor: 'rgba(78, 0, 142, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: { unit: 'minute' }
                },
                y: { beginAtZero: true }
            }
        }
    });
}
