// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge } = require('electron'); // Use contextBridge to expose APIs to the renderer process

contextBridge.exposeInMainWorld('api', {
  log: (message) => console.log(message) // Expose a simple logging function to the renderer process
});