import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  onUpdateConfig: (callback) => ipcRenderer.on("update-config", callback),

  startProxyService: () => ipcRenderer.invoke("startProxyService"),

  renderReady: () => ipcRenderer.invoke("renderReady"),

  changeServerStatus: (index: number) => {
    console.log(index);
  },
});
