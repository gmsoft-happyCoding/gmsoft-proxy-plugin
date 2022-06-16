import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const { exec, execFile, spawn } = require('child_process');

const path = require('path');

// console.log(global.process);

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  nodeVersion: process.version,
  startNode: () => {
    console.log(path.join(__dirname, './proxy-service.js'));

    exec(
      `node ${path.join(__dirname, './proxy-service.js')}`,
      (error, stdout, stderr) => {
        console.log('已执行');

        if (error) {
          console.log('错误');

          throw error;
        }

        console.log(stdout);
      }
    );
  },
});
