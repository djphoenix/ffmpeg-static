const { spawnSync } = require('child_process')

const { platform, arch } = require('./platform')
const tuple = [platform, arch].join('-')

function exec (cmd, argv) {
  const { status, error } = spawnSync(cmd, argv, {
    cwd: __dirname,
    stdio: ['ignore', process.stdout, process.stderr]
  })
  if (error) throw error
  if (status !== 0) throw new Error(`Command failed with status: ${status}`)
}

function download (url) {
  const file = url.replace(/.*\/([^/]+)$/, '$1')
  exec('curl', ['-L', '-#', '-o', file, url])
}

function unzip (file, target, filter) {
  exec('mkdir', ['-p', target])
  exec('unzip', ['-o', '-d', target, '-j', file, filter])
  exec('rm', [file])
}

function untar (file, target, filter) {
  exec('mkdir', ['-p', target])
  exec('tar', ['-x', '-C', target, '--strip-components', '1', '-f', file, '--wildcards', filter])
  exec('rm', [file])
}

switch (tuple) {
  case 'win32-x64':
    download('https://ffmpeg.zeranoe.com/builds/win64/static/ffmpeg-latest-win64-static.zip')
    unzip('ffmpeg-latest-win64-static.zip', 'bin/win32/x64', '**/ffmpeg.exe')
    break
  case 'win32-ia32':
    download('https://ffmpeg.zeranoe.com/builds/win32/static/ffmpeg-latest-win32-static.zip')
    unzip('ffmpeg-latest-win32-static.zip', 'bin/win32/ia32', '**/ffmpeg.exe')
    break
  case 'darwin-x64':
    download('https://ffmpeg.zeranoe.com/builds/macos64/static/ffmpeg-latest-macos64-static.zip')
    unzip('ffmpeg-latest-macos64-static.zip', 'bin/darwin/x64', '**/ffmpeg')
    break
  case 'linux-x64':
    download('https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-64bit-static.tar.xz')
    untar('ffmpeg-release-64bit-static.tar.xz', 'bin/linux/x64', '*/ffmpeg')
    break
  case 'linux-x32':
    download('https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-32bit-static.tar.xz')
    untar('ffmpeg-release-32bit-static.tar.xz', 'bin/linux/ia32', '*/ffmpeg')
    break
  default:
    throw new Error(`Invalid tuple: ${tuple}`)
}
