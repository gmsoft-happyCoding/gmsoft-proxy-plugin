import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { Server } from "http";
import startProxy from "./proxy";
import { readJsonFile } from "./utils";

const isPackaged = app.isPackaged;

let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Electron代理",
    paintWhenInitiallyHidden: false,
    webPreferences: {
      preload: isPackaged
        ? join(__dirname, "../preload.js")
        : join(__dirname, "../preload/preload.js"),
    },
  });

  isPackaged
    ? win.loadFile("dist/index.html")
    : win.loadURL("http://localhost:8000");
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

ipcMain.handle("renderReady", () => {
  const json = readJsonFile();

  console.log("发送消息");

  win.webContents.send("update-config", json);
});
