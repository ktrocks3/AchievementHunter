import path from 'node:path'
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import log from 'electron-log'
import electronUpdater from 'electron-updater';
const { autoUpdater } = electronUpdater;
import electronIsDev from 'electron-is-dev'
import ElectronStore from 'electron-store'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let appWindow: BrowserWindow | null = null

// Initialize ElectronStore
const store = new ElectronStore<Record<string, unknown>>()

// IPC Handlers for folder management
ipcMain.handle('store:getStoredFolder', () => {
	const storedFolder = store.get('selectedFolder') as string | undefined
	return storedFolder ?? '' // Return stored folder or empty string if not set
})

ipcMain.handle('store:setStoredFolder', (event, folderPath: string) => {
	store.set('selectedFolder', folderPath) // Save the folder path
})

// IPC Handler for folder selection dialog
ipcMain.handle('dialog:selectFolder', async () => {
	if (!appWindow) {
		throw new Error('Main window is not initialized.')
	}

	const result = await dialog.showOpenDialog(appWindow, {
		properties: ['openDirectory'], // Folder selection dialog
	})

	if (result.canceled) {
		return null // User canceled the dialog
	}

	const folderPath = result.filePaths[0] // Get selected folder
	store.set('selectedFolder', folderPath) // Save selected folder to persistent storage
	return folderPath // Return folder path to renderer
})

// AppUpdater class to handle updates
class AppUpdater {
	constructor() {
		log.transports.file.level = 'info'
		autoUpdater.logger = log
		autoUpdater.checkForUpdatesAndNotify()
	}
}

// Install extensions for development (optional)
const installExtensions = async () => {
	// Uncomment if you want to use devtools extensions
	/*
	const {
			default: install,
			REDUX_DEVTOOLS,
	} = await import('electron-devtools-installer');
	await install([REDUX_DEVTOOLS]).catch(console.error);
	*/
}

// Function to create the main application window
const spawnAppWindow = async () => {
	if (electronIsDev) {
		await installExtensions()
	}

	const RESOURCES_PATH = electronIsDev
		? path.join(__dirname, '../../assets')
		: path.join(process.resourcesPath, 'assets')

	const getAssetPath = (...paths: string[]) => {
		return path.join(RESOURCES_PATH, ...paths)
	}

	const PRELOAD_PATH = path.join(__dirname, 'preload.js')

	appWindow = new BrowserWindow({
		width: 800,
		height: 600,
		icon: getAssetPath('icon.png'),
		show: false,
		webPreferences: {
			preload: PRELOAD_PATH, // Preload script
		},
	})

	const appUrl = electronIsDev
		? 'http://localhost:3000'
		: `file://${path.join(__dirname, '../../frontend/build/index.html')}` // Built app path

	appWindow.loadURL(appUrl)

	appWindow.maximize()
	appWindow.setMenu(null) // Remove default menu
	appWindow.show()

	// Open DevTools in development mode
	if (electronIsDev) {
		appWindow.webContents.openDevTools({ mode: 'detach' })
	}

	appWindow.on('closed', () => {
		appWindow = null // Nullify reference on window close
	})
}

// Electron App Lifecycle
app.on('ready', () => {
	new AppUpdater()
	spawnAppWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		spawnAppWindow()
	}
})

// Additional IPC Event (Sample)
ipcMain.handle('sample:ping', () => {
	return 'pong'
})
