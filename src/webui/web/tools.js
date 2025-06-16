async function unpackBoot() {
    const path = document.getElementById('bootPath').value;
    const result = await eel.unpack_boot_image(path)();
    const out = document.getElementById('toolOutput');
    out.textContent = JSON.stringify(result, null, 2);
}

async function patchBoot() {
    const boot = document.getElementById('patchBoot').value;
    const apk = document.getElementById('magiskApk').value;
    const res = await eel.patch_boot_image(boot, apk)();
    const out = document.getElementById('patchOutput');
    out.textContent = JSON.stringify(res, null, 2);
}
