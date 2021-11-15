const sidebar = require("../../libraries/sidebar");
const { shell } = require("electron");
const strings = require("../../../strings.json");

module.exports = {
	id: "oc-tipTool",
	name: "Adds tip to Burrito button",
	init() {
		var tipButton = sidebar.add("Send a Tip", "oc-sendTip");
		tipButton.onclick = function () {
			shell.openExternal(strings.tipTool.url);
		};
		console.log(strings.tipTool.inject);
	},
	uninit() {
		document.getElementById("oc-sendTip").remove();
		console.log(strings.tipTool.uninject);
	},
};
