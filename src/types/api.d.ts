export { }

declare global {
	interface Api {
		ping: () => string

		os: {
			clipboard: {
				get: () => Promise<string>
				set: (text: string) => Promise<void>
			},
			idle: {
				seconds: () => Promise<number>
			},
			notifications: {
				send: (options: { title: string, body?: string, silent?: boolean, icon?: string }) => Promise<void>
			},
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
			},
			system: {
				platform: () => Promise<NodeJS.Platform>
				arch: () => Promise<NodeJS.Architecture>
				release: () => Promise<string>
				hostname: () => Promise<string>
				isMac: () => Promise<boolean>
				isWindows: () => Promise<boolean>
				isLinux: () => Promise<boolean>
			},
			memory: {
				status: (format?: 'Mb' | 'Gb') => Promise<{
					total: string
					free: string
					used: string
					usage: string
				}>
			},
			disk: {
				space: (format?: 'Mb' | 'Gb') => Promise<{
					total: string
					free: string
					used: string
					usage: string
				}>
			},
		}
	}

	interface Window {
		api: Api
	}
}
