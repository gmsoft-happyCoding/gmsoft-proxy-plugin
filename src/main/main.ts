import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import Server from "http-proxy";
import startProxy from "./proxy";

const isPackaged = app.isPackaged;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: isPackaged
        ? join(__dirname, "../preload.js")
        : join(__dirname, "../preload/preload.js"),
    },
  });

  isPackaged
    ? win.loadFile("dist/index.html")
    : win.loadURL("http://localhost:3000");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

let service: Server | null = null;

ipcMain.handle("startProxyService", () => {
  if (service) {
    service.close();
  }
  service = startProxy();
});
