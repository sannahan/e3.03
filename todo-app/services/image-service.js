const path = require('path')
const fs = require('fs')
const axios = require('axios')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'image.jpg')
const cacheDuration = 60 * 60 * 1000

const saveImage = async () => {
  await new Promise(res => fs.mkdir(directory, (err) => res()))
  console.log('Fetching a new image')
  const response = await axios.get('https://picsum.photos/200', { responseType: 'stream' })
  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filePath)
    response.data.pipe(writer)
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
  console.log('New image saved')
}

const getCachedImage = async () => {
    let stats
    try {
        stats = fs.statSync(filePath)
    } catch (err) {
        console.log('No cached image')
    }

    if (!stats || Date.now() - stats.mtime.getTime() > cacheDuration) {
        await saveImage()
    }

    return new Promise(res => {
      fs.readFile(filePath, { encoding: 'base64' }, (err, buffer) => {
        if (err) return console.log(`Failed to read file: ${err}`)
        res(buffer)
      })
    })
}

module.exports = getCachedImage