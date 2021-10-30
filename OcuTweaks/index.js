const electron = require("electron");
/**
 * OcuTweaks's full manager's class.
 */
module.exports = class OcuTweaks {
    relaunch() {
        electron.app.relaunch();
        electron.app.exit();
    };

    hi() {
        console.log('Why hello there.');
    };
};