import { app, BrowserWindow } from "electron";
import { join } from "path";

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

  console.log(join(__dirname, "../preload/preload.js"));

  console.log(isPackaged);

  isPackaged
    ? win.loadFile("dist/index.html")
    : win.loadURL("http://127.0.0.1:5173");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
