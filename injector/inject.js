const regedit = require("regedit");
const { join, sep } = require("path");
const fs = require("fs-extra");

test = regedit
	.list("HKLM\\SOFTWARE\\WOW6432Node\\Oculus VR, LLC\\Oculus")
	.on("data", function (entry) {
		var oculusPath = join(
			entry.data.values.Base.value,
			"/Support/oculus-client/resources"
		);
		console.log("Found a valid Oculus installation at:\n" + oculusPath + "\n");

		const oculusAppAsar = join(oculusPath, "/app");

		if (fs.existsSync(oculusAppAsar)) {
			console.log("OcuTweaks is already installed. Run the \"npm run uninject\" command to uninstall OcuTweaks.");
		} else {
			try {
				// Create app folder and index.js directed towards the patcher script
				const oculusAppAsar = join(oculusPath, "/app");
				fs.mkdirSync(oculusAppAsar);
				const patcherPath = join(__dirname, "../patcher/patch.js").replace(
					RegExp(sep.repeat(2), "g"),
					"/"
				);
				fs.writeFileSync(
					join(oculusAppAsar, "index.js"),
					`require("${patcherPath}");`
				);
				fs.writeFileSync(
					join(oculusAppAsar, "package.json"),
					JSON.stringify({
						name: "Oculus",
						main: "index.js",
						version: "0.0.0",
					})
				);

				// Copy default settings if none already exist
				var settings = join(__dirname, "../OcuTweaks/settings");
				if (!fs.existsSync(settings)) {
					fs.copySync(
						join(__dirname, "../OcuTweaks/_defaultSettings"),
						settings
					);
				}

				console.log(
					"OcuTweaks has been injected successfully! Restart the Oculus app for changes to take effect." //eslint-disable-line max-len
				);
			} catch (e) {
				console.log(e + "\n");
				console.log(
					"Failed to inject into the Oculus app.\nPlease make sure to run the \"npm run inject\" command in an Administrator command prompt. You can do this by searching \"Command Prompt\", and clicking \"Run as Administrator\"."
				);
			}
		}
	});
