const { BrowserWindow } = require("electron");
const { join } = require("path");
const { electron } = require("process");

const preload = join(__dirname, "../preload/preload.js");

module.exports = class PatchedBrowserWindow extends BrowserWindow {
    constructor(options) {
        // FIXME: Not broken, but this is weird
        let origPreload;

        options.webPreferences.preload = preload;

        // REVIEW: Why are we creating an instance of BrowserWindow in the instance of BrowserWindow's subclass? Why not use this instance?
        const win = new BrowserWindow(options);
        const origLoadUrl = win.loadURL.bind(win);

        Object.defineProperty(win, 'loadURL', {
            get: () => PatchedBrowserWindow.loadUrl.bind(win, origLoadUrl),
            configurable: true
        });

        win.webContents.preload = origPreload;
        // REVIEW: Why are we using return in a constructor?
        return win;
    }

    static loadUrl(origLoadURL, URL, options) {
        return origLoadURL(URL, options);
    }

}