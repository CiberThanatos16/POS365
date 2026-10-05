const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    console.log('Preload listo')
})

contextBridge.exposeInMainWorld('electronAPI', {
    // Aquí expones APIs de Node al Frontend de forma segura
    resetApp: () => ipcRenderer.invoke('reset-app')
})




