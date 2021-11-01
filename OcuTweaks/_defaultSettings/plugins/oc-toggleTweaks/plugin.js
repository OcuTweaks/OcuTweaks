const helpButton = document.querySelector(".navigation-pane__link--help");

const ocToggleButton = document.createElement("li");
ocToggleButton.className = "sky-dropdown__item";
ocToggleButton.id = "oc-toggleButton";
ocToggleButton.innerHTML =
	'<a tabindex="10" class="sky-dropdown__link link link--clickable"><span class="sky-dropdown__label">Stop OcuTweaks</span></a>';
ocToggleButton.setAttribute("onclick", "OcuTweaks.stop();");

module.exports = {
	id: "oc-toggleTweaks",
	name: "Disable OcuTweaks in help center",
	init() {
		function insertAfter(newNode, referenceNode) {
			referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
		helpButton.onclick = function () {
			function loadAfterFinished() {
				if (document.getElementsByClassName("sky-dropdown__item").length > 0) {
					var feedbackButton =
						document.getElementsByClassName("sky-dropdown__item")[1];
					if (!!feedbackButton) {
						try {
							insertAfter(ocToggleButton, feedbackButton);
						} catch {}
					}
				} else {
					setTimeout(() => {
						loadAfterFinished();
					}, 1);
				}
			}
			loadAfterFinished();
		};
	},
	uninit() {
		helpButton.onclick = null;
		ocToggleButton.remove();
	},
};
