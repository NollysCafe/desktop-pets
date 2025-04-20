export { }

declare global {
	interface Api {
		ping: () => string

		os: {
			clipboard: {
				get: () => Promise<string>
				set: (text: string) => Promise<void>
			}
			idle: {
				seconds: () => Promise<number>
			}
			notifications: {
				send: (options: { title: string, body?: string, silent?: boolean, icon?: string }) => Promise<void>
			}
			time: {
				now: () => Promise<number>
				locale: () => Promise<string>
				timezone: () => Promise<number>
				year: () => Promise<number>
				month: () => Promise<number>
				day: () => Promise<number>
				hours: () => Promise<number>
				minutes: () => Promise<number>
				seconds: () => Promise<number>
				date: () => Promise<{ year: number, month: number, day: number, weekday: string }>
			}
			system: {
				platform: () => Promise<NodeJS.Platform>
				arch: () => Promise<NodeJS.Architecture>
				release: () => Promise<string>
				hostname: () => Promise<string>
				isMac: () => Promise<boolean>
				isWindows: () => Promise<boolean>
				isLinux: () => Promise<boolean>
			}
			memory: {
				status: (format?: 'Mb' | 'Gb') => Promise<{
					total: string
					free: string
					used: string
					usage: string
				}>
			}
			disk: {
				space: (format?: 'Mb' | 'Gb') => Promise<{
					total: string
					free: string
					used: string
					usage: string
				}>
			}
			cpu: {
				info: () => Promise<{
					count: number
					model: string
					speed: string
					load: string
				}>
			}
			user: {
				name: () => Promise<string>
				uid: () => Promise<string>
				home: () => Promise<string>
			}
			uptime: () => Promise<number>
			screen: {
				size: () => Promise<{ height: number, width: number }>
				scale: () => Promise<number>
				info: () => Promise<{
					accelerometerSupport: 'available' | 'unavailable' | 'unknown'
					bounds: { height: number, width: number, x: number, y: number }
					colorDepth: number
					colorSpace: string
					depthPerComponent: number
					detected: boolean
					displayFrequency: number
					id: number
					internal: boolean
					label: string
					maximumCursorSize: { height: number, width: number }
					monochrome: boolean
					nativeOrigin: { x: number, y: number }
					rotation: number
					scaleFactor: number
					size: { height: number, width: number }
					touchSupport: 'available' | 'unavailable' | 'unknown'
					workArea: { height: number, width: number, x: number, y: number }
					workAreaSize: { height: number, width: number }
				}[]>
			}
			volume: {
				get: () => Promise<number | null>
				set: (level: number) => Promise<boolean>
			}
		}
	}

	interface Window {
		api: Api
	}
}
