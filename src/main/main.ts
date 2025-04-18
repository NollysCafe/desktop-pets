import { app, BrowserWindow, ipcMain, clipboard, powerMonitor, Notification } from 'electron'
import fs from 'fs'
import { execSync } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'

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


// OS: Clipboard
ipcMain.handle('os:clipboard:get', () => clipboard.readText())
ipcMain.handle('os:clipboard:set', (_event, text: string) => clipboard.writeText(text))

// OS: Idle Time
ipcMain.handle('os:idle:get', () => powerMonitor.getSystemIdleTime())

// OS: Notification
ipcMain.handle('os:notify:send', (_event, options: Electron.NotificationConstructorOptions) => {
	const notification = new Notification(options)
	notification.show()
})

// OS: Time
ipcMain.handle('os:time:now', () => Date.now())
ipcMain.handle('os:time:locale', () => Intl.DateTimeFormat().resolvedOptions().locale)
ipcMain.handle('os:time:timezone', () => Intl.DateTimeFormat().resolvedOptions().timeZone)
ipcMain.handle('os:time:year', () => new Date().getFullYear())
ipcMain.handle('os:time:month', () => new Date().getMonth() + 1)
ipcMain.handle('os:time:day', () => new Date().getDate())
ipcMain.handle('os:time:hours', () => new Date().getHours())
ipcMain.handle('os:time:minutes', () => new Date().getMinutes())
ipcMain.handle('os:time:seconds', () => new Date().getSeconds())
ipcMain.handle('os:time:date', () => {
	const now = new Date()
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
	return {
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: now.getDate(),
		weekday: days[now.getDay() - 1],
	}
})

// OS: System
ipcMain.handle('os:system:platform', () => process.platform)
ipcMain.handle('os:system:arch', () => process.arch)
ipcMain.handle('os:system:release', () => os.release())
ipcMain.handle('os:system:hostname', () => os.hostname())
ipcMain.handle('os:system:isMac', () => process.platform === 'darwin')
ipcMain.handle('os:system:isWindows', () => process.platform === 'win32')
ipcMain.handle('os:system:isLinux', () => process.platform === 'linux')

// OS: Memory
ipcMain.handle('os:memory:status', (_event, format: 'Mb' | 'Gb' = 'Mb') => {
	const total = os.totalmem()
	const free = os.freemem()
	const used = total - free
	const usage = (used / total) * 100

	const formatMemory = (bytes: number) => {
		switch (format) {
			case 'Gb':
				return (bytes / (1024 ** 3)).toFixed(2) + ' Gb'
			case 'Mb':
			default:
				return (bytes / (1024 ** 2)).toFixed(2) + ' Mb'
		}
	}

	return {
		total: formatMemory(total),
		free: formatMemory(free),
		used: formatMemory(used),
		usage: usage.toFixed(2) + '%'
	}
})

// OS: Disk
ipcMain.handle('os:disk:space', async (_event, format: 'Mb' | 'Gb' = 'Mb') => {
	const statvfs = promisify(fs.stat)
	const platform = process.platform
	let total = 0
	let free = 0

	try {
		if (platform === 'win32') {
			const stdout = execSync('wmic logicaldisk where "DecideID=\'C:\'" get Size,FreeSpace /format:value').toString()
			const parsed: Record<string, string> = Object.fromEntries(stdout.trim().split('\n').filter(Boolean).map((line) => line.split('=').map((item) => item.trim())))
			total = parseInt(parsed.Size, 10)
			free = parseInt(parsed.FreeSpace, 10)
		} else {
			const stdout = execSync('df -k --output=size,avail /')
			const lines = stdout.toString().trim().split('\n')
			const [size, avail] = lines[lines.length - 1].trim().split(/\s+/).map(Number)
			total = size * 1024
			free = avail * 1024
		}
	} catch {
		total = os.totalmem()
		free = os.freemem()
	}

	const used = total - free
	const usage = (used / total) * 100

	const formatSize = (bytes: number) => {
		switch (format) {
			case 'Gb':
				return (bytes / (1024 ** 3)).toFixed(2) + ' Gb'
			case 'Mb':
			default:
				return (bytes / (1024 ** 2)).toFixed(2) + ' Mb'
		}
	}

	return {
		total: formatSize(total),
		free: formatSize(free),
		used: formatSize(used),
		usage: usage.toFixed(2) + '%'
	}
})
