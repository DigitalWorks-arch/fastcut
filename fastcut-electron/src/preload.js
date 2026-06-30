const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fastcut', {
  getItems: () => ipcRenderer.invoke('get-items'),
  addItem: (title, url) => ipcRenderer.invoke('add-item', { title, url }),
  updateShortcut: (id, shortcut) => ipcRenderer.invoke('update-shortcut', { id, shortcut }),
  deleteItem: (id) => ipcRenderer.invoke('delete-item', { id }),
  openItem: (url) => ipcRenderer.invoke('open-item', { url })
});
