const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('BloopAPI', {
	selectFolder: () => ipcRenderer.invoke('dialog:selectFolder'),
	getStoredFolder: () => ipcRenderer.invoke('store:getStoredFolder'),
	setStoredFolder: (folderPath: string) => ipcRenderer.invoke('store:setStoredFolder', folderPath),
	runScript: (scriptPath: string, args: string[]) => ipcRenderer.invoke('run-script', scriptPath, args),
})
