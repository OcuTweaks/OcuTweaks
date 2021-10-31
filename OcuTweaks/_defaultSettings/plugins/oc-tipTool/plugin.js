const sidebar = require("../../libraries/sidebar");
const { shell } = require('electron');

module.exports = {
    id: "oc-tipTool",
    name: "Adds tip to Burrito button",
    init() {
        var tipButton = sidebar.add('Send a Tip', 'oc-sendTip');
        tipButton.onclick = function() {
            shell.openExternal("https://streamelements.com/tip/burritosoft");
        }
        console.log('[tipTool] Tip button injected!')
    },
    uninit() {
        document.getElementById('oc-sendTip').remove();
        console.log('[tipTool] Tip button uninjected!')
    }
}