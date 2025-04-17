import { app, BrowserWindow } from 'electron'
import path from 'node:path'

const createWindow = () => {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		transparent: false,
		frame: true,
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: false,
			sandbox: true,
			preload: path.resolve(__dirname, 'preload.js'),
		}
	})

	window.loadFile(path.resolve(__dirname, 'index.html'))
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
