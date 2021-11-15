const fs = require("fs");
const { join } = require("path");
const strings = require("./strings.json");

//eslint-disable-next-line no-undef
const plugins = fs.readdirSync(join(__dirname, "./settings/plugins"), {
	withFileTypes: true,
});

module.exports = class pluginLoader {
    init() {
        console.log("[pluginLoader] Initializing plugins...")
        for (let i in plugins) {
            const plugin = plugins[i]
            // Try-catch errors to prevent conflicts with other plugins
            try {
                console.log(`[pluginLoader] Found plugin directory '${plugin}'`);
                // Gets the path of the plugin
                const pluginPath = join(__dirname, "./settings/plugins", plugin);
                // Gets path of the plugin JS file
                const jsPath = join(pluginPath, "plugin.js");
                // If it doesn't have plugin file, it's not an plugin and ignore it
                if(!fs.existsSync(jsPath)) continue
                // Require the plugin file
                let main = require(jsPath);
                main.init();
                console.log(`[pluginLoader] Initialized '${plugin}'`);
            }
            catch (e) {
                console.error("[pluginLoader] Failed to initialize plugin by ID", plugin, e);
            }
        }
    };

    uninit() {
        console.log("Uninitializing plugins...")
        for (let i in plugins) {
            const plugin = plugins[i]
            // Try-catch errors to prevent conflicts with other plugins
            try {
                console.log(`[pluginLoader] Found plugin directory '${plugin}'`);
                // Gets the path of the plugin
                const pluginPath = join(__dirname, "./settings/plugins", plugin);
                // Gets path of the plugin JS file
                const jsPath = join(pluginPath, "plugin.js");
                // If it doesn't have plugin file, it's not an plugin and ignore it
                if(!fs.existsSync(jsPath)) continue
                // Require the plugin file
                let main = require(jsPath);
                main.uninit();
                console.log(`[pluginLoader] Uninitialized '${plugin}'`);
            }
            catch (e) {
                console.error("[pluginLoader] Failed to uninitialize plugin by ID", plugin, e);
            }
        }
    };
};
