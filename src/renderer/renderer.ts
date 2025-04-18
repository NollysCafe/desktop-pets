window.api.os.disk.space().then(space => console.log('🗄 Disk (Mb):', space))
window.api.os.disk.space('Gb').then(space => console.log('🗄 Disk (Gb):', space))
