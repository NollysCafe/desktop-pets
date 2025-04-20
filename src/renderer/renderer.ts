window.api.os.volume.get().then(v => console.log('🔊 Volume:', v))
window.api.os.volume.set(50).then((success) => console.log(success ? '🔊 Volume set to 50%' : '❌ Failed to set volume'))
