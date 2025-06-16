import os
import eel
import tempfile
import shutil
from src.tkui import tool as tk_tool
from src.core.utils import (
    gettype,
    hum_convert,
    calculate_md5_file,
    calculate_sha256_file,
    tool_bin,
)
from src.core.Magisk import Magisk_patch

# Sample battery data used for the demo page
BATTERIES = [100, 80, 50, 20]

eel.init('src/webui/web')


@eel.expose
def get_batteries():
    """Return demo battery values."""
    return BATTERIES


@eel.expose
def get_file_info(path: str):
    """Return basic information about the given file."""
    if not path or not os.path.isfile(path):
        return {"error": "File not found"}
    return {
        "name": os.path.basename(path),
        "path": os.path.abspath(path),
        "type": gettype(path),
        "size": hum_convert(os.path.getsize(path)),
        "size_bytes": os.path.getsize(path),
        "md5": calculate_md5_file(path),
        "sha256": calculate_sha256_file(path),
    }


@eel.expose
def unpack_boot_image(path: str):
    """Unpack a boot image using existing tool logic."""
    try:
        tk_tool.unpack_boot('boot', path)
        return {"result": "ok"}
    except Exception as e:  # pragma: no cover - just return error
        return {"error": str(e)}


@eel.expose
def patch_boot_image(boot_path: str, magisk_apk: str, arch: str = 'arm64-v8a'):
    """Patch a boot image with Magisk."""
    tempdir = tempfile.mkdtemp(prefix='magisk_',)
    try:
        with Magisk_patch(
            boot_path,
            None,
            f"{tool_bin}magiskboot",
            tempdir,
            True,
            False,
            False,
            False,
            magisk_apk,
            arch,
        ) as m:
            m.auto_patch()
            if m.output and os.path.exists(m.output):
                return {"result": os.path.abspath(m.output)}
            return {"error": "patch failed"}
    except Exception as e:  # pragma: no cover - best effort
        return {"error": str(e)}
    finally:
        shutil.rmtree(tempdir, ignore_errors=True)


@eel.expose
def choose_file():
    """Open a native file dialog and return the selected path."""
    try:
        import tkinter as tk
        from tkinter import filedialog

        root = tk.Tk()
        root.withdraw()
        path = filedialog.askopenfilename()
        root.destroy()
        return path
    except Exception as e:  # pragma: no cover - fallback on error
        return ""


def start():
    """Launch the Eel web interface."""
    # Use mode="none" to allow running in environments without a browser
    eel.start('index.html', mode='none', size=(480, 320))

if __name__ == '__main__':
    start()
