const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { spawn } = require('child_process')
const fs = require('fs')

let backendProcess
let mainWindow = null

function startBackend() {
    const backendPath = app.isPackaged
        ? path.join(process.resourcesPath, 'Backend', 'server.js')
        : path.join(__dirname, 'Backend', 'server.js')

    const cwd = app.isPackaged ? process.resourcesPath : __dirname

    // Carpeta userData para DB e imágenes
    const userDataPath = app.getPath('userData')
    const uploadsPath = path.join(userDataPath, 'uploads')

    // Crear carpeta uploads si no existe
    if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true })
    }

    backendProcess = spawn(process.execPath, [backendPath], {
        cwd: cwd,
        shell: false,
        windowsHide: true,
        env: {
            ...process.env,
            ELECTRON_RUN_AS_NODE: '1',
            USER_DATA_PATH: userDataPath,     // ← para db.js
            UPLOADS_PATH: uploadsPath          // ← para upload.js
        }
    })

    backendProcess.stdout.on('data', (data) => console.log(`Backend: ${data}`))
    backendProcess.stderr.on('data', (data) => {
        console.error(`Backend error: ${data}`)
        // Escribe el error a un archivo para verlo
        const fs = require('fs')
        fs.appendFileSync(
            require('path').join(app.getPath('userData'), 'backend-error.log'),
            data.toString()
        )
    })
}

app.setPath('userData', path.join(app.getPath('appData'), 'POS360'))

function createWindow() {
    if (mainWindow) return

    const preloadPath = path.join(__dirname, 'preload.js')
    console.log('__dirname:', __dirname)
    console.log('Preload path:', preloadPath)
    console.log('Preload existe:', fs.existsSync(preloadPath))

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    if (!app.isPackaged) {
        mainWindow.loadURL('http://localhost:5173')
    } else {
        // Cambia loadFile por loadURL con protocolo file://
        const indexPath = path.join(process.resourcesPath, 'Frontend', 'dist', 'index.html')
        mainWindow.loadURL(`file://${indexPath}`)
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })

    app.whenReady().then(() => {
        // En dev, concurrently ya levanta el backend — no duplicar proceso
        if (app.isPackaged) {
            startBackend()
        }
        createWindow()
    })
}


app.on('window-all-closed', () => {
    if (backendProcess) backendProcess.kill()
    app.quit()
})

ipcMain.handle('reset-app', async () => {
    try {
        if (!app.isPackaged) {
            // En dev: el backend de concurrently tiene el archivo abierto y no se puede borrar.
            // Llamamos al endpoint HTTP para que el backend limpie sus tablas desde adentro.
            const http = require('http')
            await new Promise((resolve, reject) => {
                const req = http.request(
                    { hostname: 'localhost', port: 3000, path: '/api/pos360/reset', method: 'POST' },
                    (res) => { resolve() }
                )
                req.on('error', reject)
                req.end()
            })
        } else {
            // En producción: matar backend propio y borrar archivos de userData
            if (backendProcess) {
                backendProcess.kill()
                backendProcess = null
                await new Promise(resolve => setTimeout(resolve, 1000))
            }
            const userDataPath = app.getPath('userData')
            const targetItems = ['database.sqlite', 'uploads', 'backend-error.log']
            for (const item of targetItems) {
                const itemPath = path.join(userDataPath, item)
                if (fs.existsSync(itemPath)) {
                    fs.rmSync(itemPath, { recursive: true, force: true })
                }
            }
        }

        app.relaunch()
        app.exit()
    } catch (error) {
        console.error('Error al restaurar:', error)
        return { success: false }
    }
})

