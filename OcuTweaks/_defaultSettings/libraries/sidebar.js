const settingsButton = document.getElementsByClassName(
	"navigation-pane__item--settings"
)[0];

module.exports = {
	add(name, id) {
		function insertAfter(newNode, referenceNode) {
			referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}

		switch (document.getElementById("oc-Sidebarmenu")) {
			// If it doesn't exist
			case false:
				var customMenu = document.createElement("menu");
				customMenu.id = "oc-SidebarMenu";
				customMenu.style = `
					align-items: center;
					box-sizing: border-box;
					grid-template-columns: 1fr;
					grid-template-rows: repeat(7, 48px) 1fr repeat(3, 48px);
					height: 100%;
					justify-items: center;
					list-style: none;
					margin: 0;
					padding: 0 0 12px 0;
					width: 100%;
				`;
				insertAfter(customMenu, settingsButton);
				console.log("[sidebar] Created custom menu");
				break;
			// If it exists
			default:
				console.log("[sidebar] Custom menu already exists");
				var customMenu = document.getElementById("oc-SidebarMenu");
				break;
		}

		var ocSidebarButton = document.createElement("li");
		ocSidebarButton.className = "navigation-pane__item oc-SidebarButton";
		ocSidebarButton.id = id;
		ocSidebarButton.innerHTML = `
<a class="navigation-pane__link" aria-current="false" tabindex="-1">
	<div class="navigation-pane__label">
		${name}
	</div>
</a>	
`;

		customMenu.appendChild(ocSidebarButton);

		console.log("[sidebar] Added button " + name + " with ID " + id);
		return ocSidebarButton;
	},
};
