function updateWindDirectionChart(directionData) {
    const ctx = document.getElementById('windDirectionChart').getContext('2d');
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
            datasets: [{
                label: 'Tuulen suunta',
                data: directionData,
                backgroundColor: [
                    '#4e008e', '#82c8f0', '#f5a5c8', '#ffdca5',
                    '#c3b9d7', '#cf286f', '#7dcdbe', '#c8c8c8'
                ]
            }]
        },
        options: { responsive: true }
    });
}
