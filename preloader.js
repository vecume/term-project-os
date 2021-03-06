const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})


contextBridge.exposeInMainWorld("API", {
    ipcSend: (...args) => ipcRenderer.send(...args),
    ipcOnce: (key, handler) => ipcRenderer.once(key, (event, ...args) => handler(...args)),
    ipcOn: (key, handler) => ipcRenderer.on(key, (event, ...args) => handler(...args))
});