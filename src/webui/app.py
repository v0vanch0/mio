import eel

# Sample battery data
BATTERIES = [100, 80, 50, 20]

eel.init('src/webui/web')

@eel.expose
def get_batteries():
    return BATTERIES

def start():
    # Use mode="none" to allow running in environments without a browser
    eel.start('index.html', mode='none', size=(360, 200))

if __name__ == '__main__':
    start()
