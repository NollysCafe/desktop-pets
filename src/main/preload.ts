import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
	ping: () => 'pong',

	os: {
		clipboard: {
			get: () => ipcRenderer.invoke('os:clipboard:get'),
			set: (text: string) => ipcRenderer.invoke('os:clipboard:set', text),
		},
		idle: {
			seconds: () => ipcRenderer.invoke('os:idle:get'),
		},
		notifications: {
			send: (options: Electron.NotificationConstructorOptions) => ipcRenderer.invoke('os:notify:send', options),
		},
		time: {
			now: () => ipcRenderer.invoke('os:time:now'),
			locale: () => ipcRenderer.invoke('os:time:locale'),
			timezone: () => ipcRenderer.invoke('os:time:timezone'),
			year: () => ipcRenderer.invoke('os:time:year'),
			month: () => ipcRenderer.invoke('os:time:month'),
			day: () => ipcRenderer.invoke('os:time:day'),
			hours: () => ipcRenderer.invoke('os:time:hours'),
			minutes: () => ipcRenderer.invoke('os:time:minutes'),
			seconds: () => ipcRenderer.invoke('os:time:seconds'),
			date: () => ipcRenderer.invoke('os:time:date'),
		},
		system: {
			platform: () => ipcRenderer.invoke('os:system:platform'),
			arch: () => ipcRenderer.invoke('os:system:arch'),
			release: () => ipcRenderer.invoke('os:system:release'),
			hostname: () => ipcRenderer.invoke('os:system:hostname'),
			isMac: () => ipcRenderer.invoke('os:system:isMac'),
			isWindows: () => ipcRenderer.invoke('os:system:isWindows'),
			isLinux: () => ipcRenderer.invoke('os:system:isLinux'),
		},
		memory: {
			status: (format: 'Mb' | 'Gb' = 'Mb') => ipcRenderer.invoke('os:memory:status', format),
		},
		disk: {
			space: (format: 'Mb' | 'Gb' = 'Mb') => ipcRenderer.invoke('os:disk:space', format),
		},
		cpu: {
			info: () => ipcRenderer.invoke('os:cpu:info'),
		},
		user: {
			name: () => ipcRenderer.invoke('os:user:name'),
			uid: () => ipcRenderer.invoke('os:user:uid'),
			home: () => ipcRenderer.invoke('os:user:home'),
		},
		uptime: () => ipcRenderer.invoke('os:uptime'),
		screen: {
			size: () => ipcRenderer.invoke('os:screen:size'),
			scale: () => ipcRenderer.invoke('os:screen:scale'),
			info: () => ipcRenderer.invoke('os:screen:info'),
		},
		volume: {
			get: () => ipcRenderer.invoke('os:volume:get'),
			set: (level: number) => ipcRenderer.invoke('os:volume:set', level),
		},
	},
})
