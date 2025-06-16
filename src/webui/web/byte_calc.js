async function convert() {
    const value = document.getElementById('fromValue').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const result = await eel.convert_bytes(value, fromUnit, toUnit)();
    document.getElementById('byteOutput').textContent = result;
}
