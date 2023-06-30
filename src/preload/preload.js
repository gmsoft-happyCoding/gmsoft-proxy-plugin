"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electron", {
    node: function () { return process.versions.node; },
    chrome: function () { return process.versions.chrome; },
    electron: function () { return process.versions.electron; },
    startProxyService: function () { return electron_1.ipcRenderer.invoke("startProxyService"); },
});
