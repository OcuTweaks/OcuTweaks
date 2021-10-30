// Loaders
const pluginLoader = require("./pluginLoader");
global.pluginLoader = new pluginLoader();

const version = "0.1.0";

// OcuTweaks's full manager's class.


module.exports = class OcuTweaks {
    start() {
        console.log("OcuTweaks " + version + " is starting...");

        // Injecting versionBar and initializing loaders
        const versionBar = document.createElement("div")
        versionBar.id = 'oc-versionBar';
        versionBar.innerHTML = 'OcuTweaks ' + version;

        function loadAfterFinished() {
        if(document.getElementsByClassName('command-bar__window-title').length > 0) {
            const titlebar = document.getElementsByClassName('command-bar__window-title')
            try {
                titlebar[0].appendChild(versionBar)

                // Initializing loaders
                global.pluginLoader.init();
            } catch {
                console.error('Failed to load OcuTweaks!')
                return;
            }
        } else {
            setTimeout(() => {
                loadAfterFinished();                
                }, 1);
            }
        }

        loadAfterFinished();
        console.log("Done!");
    };

    stop() {
        // Removing versionBar
        document.getElementById("oc-versionBar").remove();

        // Uninitializing loaders
        global.pluginLoader.uninit();
    };

    hi() {
        console.log('Why hello there.');
    };
};