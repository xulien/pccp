import request from './request'

export default class Background {

  constructor(preview, raw, canvas, options) {

    this.preview = preview
    this.raw = raw
    this.preview.crossOrigin = 'Anonymous'
    this.preview.ratio = this.preview.width / this.preview.height

    this.options = options
    this.options.output.r = this.options.output.w / this.options.output.h

    this.clip = Object.assign({}, this.options.clip)

    this.canvas = canvas

    this.rgbAverage = { red: 0, green: 0, blue: 0 }
    this.rgbDiff = { red: 0, green: 0, blue: 0 }

    this.ctx = this.canvas.getContext('2d')

    this.resultData = null
    this.position = {
      x: this.canvas.offsetTop,
      y: this.canvas.offsetLeft
    }

    this.draw()

    this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.srcData = new Uint8ClampedArray(this.imageData.data)

    this.average()
    this.rgbDiff = this.rgbAverage

  }

  average() {

    const data = this.imageData.data
    const m = data.length / 3

    let red = 0, green = 0, blue = 0

    for (var i = 0; i < data.length; i += 4) {
      if (data[i] > 0) red += data[i]
      if (data[i + 1] > 0) green += data[i + 1]
      if (data[i + 2] > 0) blue += data[i + 2]
    }

    this.rgbAverage = {
      red: Math.round(red / m),
      green: Math.round(green / m),
      blue: Math.round(blue / m)
    }

    return this
  }

  // ===============  change color level  =================

  changeColorLevel (r, color) {
    if (!this.imageData) return this

    const data = this.imageData.data

    if (color == 'red') {
      for (var i = 0; i < data.length; i += 4) {
        data[i] = this.srcData[i] + Math.round(r) - this.rgbAverage.red
      }
      this.average().ctx.putImageData(this.imageData, 0, 0)
    }

    if (color == 'green') {
      for (var j = 0; j < data.length; j += 4) {
        data[j + 1] = this.srcData[j + 1] + Math.round(r) - this.rgbAverage.green
      }
      this.average().ctx.putImageData(this.imageData, 0, 0)
    }

    if (color == 'blue') {
      for (var k = 0; k < data.length; k += 4) {
        data[k + 2] = this.srcData[k + 2] + Math.round(r) - this.rgbAverage.blue
      }
      this.average().ctx.putImageData(this.imageData, 0, 0)
    }

    return this
  }

  // =========================================================


  draw() {
    this.ctx.drawImage(this.preview, 0, 0, this.canvas.width, this.canvas.height)
    return this
  }

  clear() {
    const initial = new ImageData(this.srcData, this.canvas.width, this.canvas.height)
    this.ctx.putImageData(initial, 0, 0)
    this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this.average()
    return this
  }

  applyToRaw(type) {
    const canvasRaw = document.createElement('canvas')
    canvasRaw.width = this.raw.width
    canvasRaw.height = this.raw.height

    const rawContext = canvasRaw.getContext('2d')
    rawContext.drawImage(this.raw, 0, 0, this.raw.width, this.raw.height)

    const rawData = rawContext.getImageData(0, 0, this.raw.width, this.raw.height)

    if (this.rgbAverage.red - this.rgbDiff.red != 0) {
      for (var i = 0; i < rawData.data.length; i += 4) {
        rawData.data[i] += (this.rgbAverage.red - this.rgbDiff.red)
      }
    }

    if (this.rgbAverage.green - this.rgbDiff.green != 0) {
      for (var j = 0; j < rawData.data.length; j += 4) {
        rawData.data[j + 1] += (this.rgbAverage.green - this.rgbDiff.green)
      }
    }

    if (this.rgbAverage.blue - this.rgbDiff.blue != 0) {
      for (var k = 0; k < rawData.data.length; k += 4) {
        rawData.data[k + 2] += (this.rgbAverage.blue - this.rgbDiff.blue)
      }
    }

    rawContext.putImageData(rawData, 0, 0)

    return canvasRaw.toDataURL('image/' + type)
  }

  resizePreviewDependingThanOutput() {

    const outputIsBiggerThanBoard =
    this.options.output.w > this.options.board.side ||
    this.options.output.h > this.options.board.side

    if (outputIsBiggerThanBoard) {
      if (this.options.output.r > 1) {
        this.preview.width = this.options.board.side
        this.preview.height = this.preview.width / this.options.output.r
      } else if (this.options.output.r < 1) {
        this.preview.height = this.options.board.side
        this.preview.width = this.preview.height * this.options.output.r
      } else {
        this.preview.width = this.preview.height = this.options.board.side
      }
    } else {
      this.preview.width = this.options.output.w
      this.preview.height = this.options.output.h
    }

  }

  applyToNewestCanvas(clip) {
    const canvas = document.createElement('canvas')

    clip = clip.selected

    const x = Math.round(( this.raw.width / this.canvas.width ) * clip.sx )
    const y = Math.round(( this.raw.height / this.canvas.height ) * clip.sy )
    const w = Math.round(( this.raw.width / this.canvas.width ) * clip.sw )
    const h = Math.round(( this.raw.height / this.canvas.height ) * clip.sh )

    canvas.width  = this.options.output.w
    canvas.height = this.options.output.h

    this.resizePreviewDependingThanOutput()

    const newest = new Image()
    newest.src = this.applyToRaw('jpeg')

    const context = canvas.getContext('2d')
    context.drawImage(newest, x, y, w, h, 0, 0, this.options.output.w, this.options.output.h)

    return canvas
  }

  apply(clip) {
    const newestCanvas = this.applyToNewestCanvas(clip)
    return newestCanvas.toDataURL('image/jpeg')
  }

  save() {
    const xhr = request()
    xhr.open('POST', this.options.dest, true)
    xhr.setRequestHeader('X-Requested-With','xmlhttprequest')
    if (this.options.csrf) xhr.setRequestHeader('X-CSRF-Token', this.options.csrf)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    xhr.send(JSON.stringify({
      value: this.resultData
    }))
  }

}
