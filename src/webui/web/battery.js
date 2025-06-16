async function init() {
    const data = await eel.get_batteries()();
    const icons = ['\ud83d\udcf1', '\ud83d\udcbb', '\u231a', '\ud83c\udfa7'];
    const container = document.getElementById('container');
    function animate(progress, value) {
        let deg = 0;
        const target = (value / 100) * 360;
        function step() {
            deg += 6;
            if (deg >= target) deg = target;
            progress.style.setProperty('--value', deg + 'deg');
            if (deg < target) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    data.forEach((value, idx) => {
        const device = document.createElement('div');
        device.className = 'device-container';

        const track = document.createElement('div');
        track.className = 'track';
        const progress = document.createElement('div');
        progress.className = 'progress';
        progress.style.setProperty('--value', '0deg');
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
        animate(progress, value);

    });
}

init();
