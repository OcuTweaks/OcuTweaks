/**
 * OcuTweaks's full manager's class.
 */


module.exports = class OcuTweaks {
    init() {
        console.log("Initializing OcuTweaks...");
        const versionBar = document.createElement("div")
        versionBar.id = 'ocutweakslabel';
        versionBar.innerHTML = 'OcuTweaks 0.1.0';

        function loopCheck() {
        if(document.getElementsByClassName('command-bar__window-title').length > 0) {
            const titlebar = document.getElementsByClassName('command-bar__window-title')
            try {
                titlebar[0].appendChild(versionBar)
                console.log('Appended versionBar')
            } catch {
                console.log('Failed to embed versionBar')
            }
        } else {
            setTimeout(() => {
                loopCheck();                
                }, 200);
            }
        }

        loopCheck();

        window.location.replace('/library');
        console.log("Done!");
    };

    hi() {
        console.log('Why hello there.');
    };
};