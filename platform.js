const os = require('os')

const platform = os.platform()
const arch = os.arch()

if (platform !== 'linux' && platform !== 'darwin' && platform !== 'win32') {
  throw new Error(`Unsupported platform: ${platform}`)
}

if (platform === 'darwin' && arch !== 'x64') {
  throw new Error(`Unsupported architecture: ${arch}`)
}

module.exports = { platform, arch }
