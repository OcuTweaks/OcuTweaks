const sidebar = require("../../libraries/sidebar");
const strings = require("../../../strings.json");

module.exports = {
	id: "oc-settingsInjector",
	name: "Various settings injection",
	init() {
		sidebar.add("🚧 Plugins", "oc-pluginSettings");
		sidebar.add("🚧 OcuTweaks Settings", "oc-tweaksSettings");
		sidebar.add("🚧 OcuTweaks Updater", "oc-tweaksUpdater");
		console.log(strings.settingsinjector.init);
	},
	uninit() {
		document.getElementById("oc-pluginSettings").remove();
		document.getElementById("oc-tweaksSettings").remove();
		document.getElementById("oc-tweaksUpdater").remove();
		console.log(strings.settingsinjector.uninit);
	},
};
