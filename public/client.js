const {
    app,
    BrowserWindow
} = require('electron');

const IRC = require('irc-framework');

const path = require('path');
const url = require('url');

let win;

global.irc_client = new IRC.Client();
global.irc_channels = {};

function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        alwaysOnTop: false,
        'node-integration': true,
        'web-security': false,
    });

    win.toggleDevTools();

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        nodeIntegration: true,
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    });

    win.loadURL(startUrl);

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('before-quit', () => {
    win.close();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
