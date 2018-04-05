const path = require('path')
const { platform, arch } = require('./platform')

const ffmpegPath = path.join(
  __dirname,
  'bin',
  platform,
  arch,
  platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg'
)

exports.path = ffmpegPath
