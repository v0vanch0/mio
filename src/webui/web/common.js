async function chooseFile(targetId) {
    const path = await eel.choose_file()();
    if (path) {
        document.getElementById(targetId).value = path;
    }
}

async function chooseDirectory(targetId) {
    const path = await eel.choose_directory()();
    if (path) {
        document.getElementById(targetId).value = path;
    }
}
