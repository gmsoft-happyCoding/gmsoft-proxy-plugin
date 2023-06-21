/* eslint-disable */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
// import startService from './proxy-service';
import { spawn } from 'child_process';
// import startProxy from './http-proxy';

export type Channels = 'ipc-example';

let nodeChildProcess: any = null;

process.on('exit', () => {
  if (nodeChildProcess) {
    nodeChildProcess.close();
  }
});

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
  startNode: (target_domain: string, proxy_port: number) => {
    console.log('执行代理');

    if (nodeChildProcess) {
      nodeChildProcess.kill();
    }

    nodeChildProcess = spawn('ts-node', ['./http-proxy.ts'], {
      env: {
        NODE_PROXY_TARGET: target_domain,
        NODE_PROXY_PORT: `${proxy_port}`,
      },
    });
  },
});
