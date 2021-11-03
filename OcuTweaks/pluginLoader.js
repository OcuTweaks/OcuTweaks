const fs = require("fs");
const { join } = require("path");

//eslint-disable-next-line no-undef
const plugins = fs.readdirSync(join(__dirname, "./settings/plugins"), {
	withFileTypes: true,
});

module.exports = class pluginLoader {
	init() {
		console.log("[pluginLoader] Initializing plugins...");
		for (let i in plugins) {
			const pl = plugins[i];
			// Try-catch errors to prevent conflicts with other plugins
			try {
				console.log(`[pluginLoader] Found plugin directory '${pl}'`);
				// Gets the path of the plugin
				//eslint-disable-next-line no-undef
				const pluginPath = join(__dirname, "./settings/plugins", pl);
				// Gets path of the plugin JS file
				const jsPath = join(pluginPath, "plugin.js");
				// If it doesn't have plugin file, it's not an plugin: ignore it
				if (!fs.existsSync(jsPath)) continue;
				// Require the plugin file
				let main = require(jsPath);
				main.init();
				console.log(`[pluginLoader] Initialized '${pl}'`);
			} catch (e) {
				console.error(
					"[pluginLoader] Failed to initialize plugin by ID ",
					pl.id,
					e
				);
			}
		}
	}

	uninit() {
		console.log("Uninitializing plugins...");
		for (let i in plugins) {
			const pl = plugins[i];
			// Try-catch errors to prevent conflicts with other plugins
			try {
				console.log(`[pluginLoader] Found plugin directory '${pl}'`);
				// Gets the path of the plugin
				//eslint-disable-next-line no-undef
				const pluginPath = join(__dirname, "./settings/plugins", pl);
				// Gets path of the plugin's JS file
				const jsPath = join(pluginPath, "plugin.js");
				// If it doesn't have plugin file, it's not an plugin: ignore it
				if (!fs.existsSync(jsPath)) continue;
				// Require the plugin file
				let main = require(jsPath);
				main.uninit();
				console.log(`[pluginLoader] Uninitialized '${pl}'`);
			} catch (e) {
				console.error(
					"[pluginLoader] Failed to uninitialize plugin by ID",
					pl.id,
					e
				);
			}
		}
	}
};
