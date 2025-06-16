async function init() {
    const data = await eel.get_batteries()();
    const container = document.getElementById('container');
    data.forEach(value => {
        const device = document.createElement('div');
        device.className = 'device-container';

        const circle = document.createElement('div');
        circle.className = 'progress-circle';
        const fill = document.createElement('div');
        fill.className = 'fill';
        fill.style.setProperty('--value', value + '%');
        circle.appendChild(fill);

        const reading = document.createElement('div');
        reading.className = 'reading';
        reading.textContent = value + '%';

        device.appendChild(circle);
        device.appendChild(reading);
        container.appendChild(device);
    });
}

init();
