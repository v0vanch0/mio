async function init() {
    const data = await eel.get_batteries()();
    const icons = ['\ud83d\udcf1', '\ud83d\udcbb', '\u231a', '\ud83c\udfa7'];
    const container = document.getElementById('container');
    data.forEach((value, idx) => {
        const device = document.createElement('div');
        device.className = 'device-container';

        const track = document.createElement('div');
        track.className = 'track';
        const progress = document.createElement('div');
        progress.className = 'progress';
        progress.style.setProperty('--value', value + '%');
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        const icon = document.createElement('div');
        icon.className = 'device-icon';
        icon.textContent = icons[idx % icons.length];

        const reading = document.createElement('div');
        reading.className = 'reading';
        reading.textContent = value + '%';

        device.appendChild(track);
        device.appendChild(progress);
        device.appendChild(overlay);
        device.appendChild(icon);
        device.appendChild(reading);
        container.appendChild(device);
    });
}

init();
