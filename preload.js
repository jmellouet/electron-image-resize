const os = require('os');
const path = require('path');
const { contextBridge, ipcRenderer } = require('electron');
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld('path', {
  join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  // Send an asynchronous message to the main process via channel, along with arguments
  send: (channel, data) => ipcRenderer.send(channel, data),
  // Listens to channel, when a new message arrives listener would be called with listener(event, args...)
  on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
  // Listens to channel, when a new message arrives listener would be called with listener(event, args...)
  invoke: (channel, data) => {return ipcRenderer.invoke(channel, data)}
});

contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast(),
});
