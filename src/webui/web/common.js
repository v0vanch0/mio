async function chooseFile(targetId) {
    const path = await eel.choose_file()();
    if (path) {
        document.getElementById(targetId).value = path;
    }
}
