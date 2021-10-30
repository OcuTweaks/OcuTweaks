const { ipcRenderer } = require("electron");

const OcuTweaks = require("../../OcuTweaks");

try {
    global.OcuTweaks = new OcuTweaks();
  
    const preload = ipcRenderer.sendSync("OCUTWEAKS_GET_PRELOAD");
    if (preload) {
        require(preload);
        };
    } catch (err) {
    console.error(err);
};

// function setPush(obj) {
//     Object.defineProperty(global.webpackJsonp, "push", obj)
// }

// document.addEventListener("readystatechange", () => {
//     // When document is interactive, start loading JS stuff
//     if (document.readyState === "interactive")
//         // Wait when bundle loads
//         global.bundle.addEventListener("load", () => {
//             // Saves the old push
//             global.webpackJsonp._push = global.webpackJsonp.push;
//             // Replaces the push function with injected
//             setPush({
//                 get: () => webpackPush.bind(global.webpackJsonp),
//                 set: (value) => setPush({get: () => value})
//             });
//         });
// });