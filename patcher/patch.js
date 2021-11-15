// Modules
const { mimicOculus, PatchedBrowserWindow } = require("./utilities");
const { join, dirname } = require("path");
const { _load } = require("module");

// Electron
const electron = require("electron");
const electronPath = require.resolve("electron");

// Oculus Client
const oculusPath = join(dirname(require.main.filename), "..", "app.asar");
const oculusPackage = require(join(oculusPath, "package.json"));

// OcuTweaks' IPCMain
require("./ipc/main");

// Set App User Model IDs
// REVIEW: Do we need this on Oculus?
mimicOculus(electron);

// Patching all BrowserWindows with our preload script
const electronExports = new Proxy(electron, {
	get(target, prop) {
		switch (prop) {
			case "BrowserWindow":
				return PatchedBrowserWindow;
			default:
				return target[prop];
		}
	},
});

delete require.cache[electronPath].exports;
require.cache[electronPath].exports = electronExports;

// Starting Oculus app
electron.app.setAppPath(oculusPath);
electron.app.name = oculusPackage.name;
electron.app.setVersion(oculusPackage.version);
_load(join(oculusPath, oculusPackage.main), null, true);
