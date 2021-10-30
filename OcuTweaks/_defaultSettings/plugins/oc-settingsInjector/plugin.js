const settingsButton = document.getElementsByClassName("navigation-pane__item--settings")[0];
const ocSettingsButton = document.createElement('li');
ocSettingsButton.className = "navigation-pane__item";
ocSettingsButton.id = "oc-settingsButton"
ocSettingsButton.innerHTML = '<a class="navigation-pane__link " aria-current="false" tabindex="-1" href="/"><div class="navigation-pane__label">Plugins</div></a>';

module.exports = {
    id: "oc-settingsInjector",
    name: "Various settings injection",
    init() {

        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
        insertAfter(ocSettingsButton, settingsButton)

        console.log('Plugin settings injected!')
    },
    uninit() {
        ocSettingsButton.remove();
        console.log('Plugin settings uninjected!')
    }
}