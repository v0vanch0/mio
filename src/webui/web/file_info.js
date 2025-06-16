async function getInfo() {
    const path = document.getElementById('filePath').value;
    const info = await eel.get_file_info(path)();
    const output = document.getElementById('infoOutput');
    output.textContent = JSON.stringify(info, null, 2);
}
