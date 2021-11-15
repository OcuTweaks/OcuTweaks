// Loaders
const pluginLoader = require("./pluginLoader");
global.pluginLoader = new pluginLoader();

const version = "0.0.1a";

// OcuTweaks's full manager's class.

module.exports = class OcuTweaks {
	start() {
		console.log("[OcuTweaks] OcuTweaks " + version + " is starting...");

		// Injecting versionBar and initializing loaders
		const versionBar = document.createElement("div");
		versionBar.id = "oc-versionBar";
		versionBar.innerHTML = "OcuTweaks " + version;

		function loadAfterFinished() {
			if (
				document.getElementsByClassName("command-bar__window-title").length > 0
			) {
				const titlebar = document.getElementsByClassName(
					"command-bar__window-title"
				);
				try {
					titlebar[0].appendChild(versionBar);

					// Initializing loaders
					global.pluginLoader.init();
					console.log("[OcuTweaks] Done!");
				} catch (e) {
					console.error(
						"[OcuTweaks] Failed to load OcuTweaks! The error is listed below."
					);
					console.error(e);
					return;
				}
			} else {
				setTimeout(() => {
					loadAfterFinished();
				}, 1);
			}
		}

		loadAfterFinished();
	}

	stop() {
		console.log("[OcuTweaks] OcuTweaks " + version + " is stopping...");
		// Removing versionBar
		document.getElementById("oc-versionBar").remove();

		// Uninitializing loaders
		global.pluginLoader.uninit();
		console.log("[OcuTweaks] Done!");
	}

	hi() {
		console.log("[OcuTweaks] Why hello there.");
	}
};
