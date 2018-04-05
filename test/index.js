const it = require('tape')
const fs = require('fs')
const ffmpeg = require('..')

it('should find ffmpeg', t => {
  const stats = fs.statSync(ffmpeg.path)
  t.ok(stats.isFile(ffmpeg.path))
  t.end()
})
