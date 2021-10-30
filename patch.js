// Electron
const electron = require("electron");
const {join} = require('path')
const { _load } = require("module");

const oculusPath = "C:\\Program Files\\Oculus\\Support\\oculus-client\\resources\\app.asar";
const oculusPackage = require(join(oculusPath, "package.json"));

const options = {
    type: 'question',
    buttons: ['open wiki and oculus!!!!'],
    title: 'weeeeeeeeeeeeeee',
    message: 'hi bsmg',
    detail: 'oculus modding is a GO'
  };

electron.app.setAppPath(oculusPath);
electron.app.name = oculusPackage.name;
electron.app.setVersion(oculusPackage.version);
_load(join(oculusPath, oculusPackage.main), null, true);

electron.app.whenReady().then(() => {
    electron.dialog.showMessageBox(null, options);
    electron.shell.openExternal("https://bsmg.wiki/")
});