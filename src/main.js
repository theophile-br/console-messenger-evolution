const path = require("path")
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: "src/fav.png",
        webPreferences: {
            spellcheck: false,
            preload: path.join(app.getAppPath(), 'src', 'preload.js')
        }
    })

    win.webContents.openDevTools()

    win.loadURL(`file://${__dirname}/index.html`);
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})