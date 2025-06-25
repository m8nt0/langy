// Main process file for Electron (e.g., electron.js)
const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Load the app. In dev, it loads from the dev server.
    // In prod, it loads the static index.html file.
    win.loadURL(
        isDev
            ? 'http://localhost:5173'
            : `file://${path.join(__dirname, '../../src/dist/index.html')}`
    );
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});