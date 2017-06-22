import request from './request'
import { encode } from 'mozjpeg-js'
import cargo from 'async/cargo'
import { flash } from './dashboard'
import { preview } from './components/preview'
import { raw, options } from './app'
import { canvas_bg, worklayer } from './components/workzone'

const debug = require('debug')('pccp:background')

export default class Background {

  constructor() {

    this.clip = Object.assign({}, options.clip)

    this.rgbAverage = { red: 0, green: 0, blue: 0 }
    this.rgbDiff = { red: 0, green: 0, blue: 0 }

    this.ctx = canvas_bg.getContext('2d')

    this.resultData = []
    this.position = {
      x: canvas_bg.offsetTop,
      y: canvas_bg.offsetLeft
    }

    this.draw()

    this.imageData = this.ctx.getImageData(0, 0, canvas_bg.width, canvas_bg.height)
    this.srcData = new Uint8ClampedArray(this.imageData.data)

    this.average()
    this.rgbDiff = this.rgbAverage

    debug('init => output options', options.output)
    debug('init => dashboard options', options.dashboard)
    debug('init => position', this.position)

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

    debug('average', this.rgbAverage)

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
    this.ctx.drawImage(worklayer, 0, 0, canvas_bg.width, canvas_bg.height)
    return this
  }

  clear() {
    const initial = new ImageData(this.srcData, canvas_bg.width, canvas_bg.height)
    this.ctx.putImageData(initial, 0, 0)
    this.imageData = this.ctx.getImageData(0, 0, canvas_bg.width, canvas_bg.height)
    this.average()
    return this
  }

  applyToRaw() {

    const canvasRaw = document.createElement('canvas')
    canvasRaw.width = raw.width
    canvasRaw.height = raw.height

    const rawContext = canvasRaw.getContext('2d')
    rawContext.drawImage(raw, 0, 0, raw.width, raw.height)

    const rawData = rawContext.getImageData(0, 0, raw.width, raw.height)

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
    return canvasRaw
  }

  resizePreviewDependingThanOutput(output) {

    output.r = output.w / output.h

    const outputIsBiggerThanDashboard =
    output.w > options.workzone ||
    output.h > options.workzone

    debug('outputIsBiggerThanDashboard', outputIsBiggerThanDashboard)

    if (outputIsBiggerThanDashboard) {
      debug('output ratio', output.r )
      if (output.r > 1) {
        worklayer.width = options.workzone
        worklayer.height = worklayer.width / output.r
      } else if (output.r < 1) {
        worklayer.height = options.workzone
        worklayer.width = worklayer.height * output.r
      } else {
        worklayer.width = worklayer.height = options.workzone
      }
    } else {
      worklayer.width = output.w
      worklayer.height = output.h
    }

    debug('resizePreviewDependingThanOutput => width height', worklayer.width, worklayer.height)
  }

  applyToNewestCanvas(clip) {
    const canvas = document.createElement('canvas')

    debug('applyToNewestCanvas => selected clip', clip)

    const x = Math.round(( raw.width / canvas_bg.width ) * clip.sx )
    const y = Math.round(( raw.height / canvas_bg.height ) * clip.sy )
    const w = Math.round(( raw.width / canvas_bg.width ) * clip.sw )
    const h = Math.round(( raw.height / canvas_bg.height ) * clip.sh )

    let output = options.output
    if (Array.isArray(output)) output = output[0]

    canvas.width  = output.w
    canvas.height = output.h

    this.resizePreviewDependingThanOutput(output)

    const context = canvas.getContext('2d')
    context.drawImage(this.applyToRaw(), x, y, w, h, 0, 0, output.w, output.h)

    return canvas

  }

  optimize(canvas, cb) {
    canvas.toBlob(blob => {
      const reader = new FileReader()
      reader.addEventListener('loadend', () => {
        const buf = Buffer.from(reader.result)
        const optimized = encode(buf)
        if (optimized.stderr) debug('mozjpeg error: ', optimized.stderr)
        cb('data:image/jpeg;base64,' + btoa(String.fromCharCode.apply(null, optimized.data)))
      })
      reader.readAsArrayBuffer(blob)
    }, 'image/bmp')
  }

  apply(clip, cb) {
    this.resultData = []
    let outputs = options.output

    if (!Array.isArray(outputs)) outputs = [outputs]

    const newestCanvas = this.applyToNewestCanvas(clip.selected)

    const opt = cargo((output, done) => {
      output = output[0]

      const canvas = document.createElement('canvas')
      canvas.width  = output.w
      canvas.height = output.h
      const context = canvas.getContext('2d')

      context.drawImage(newestCanvas, 0, 0, canvas.width, canvas.height)
      this.optimize(canvas, dataUri => {
        this.resultData.push({ img: dataUri, tag: output.t })
        done()
      })
    }, 1)

    outputs.forEach(output => opt.push(output, err => {
      if (err) debug(err)
    }))

    opt.drain = () => {
      const item_preview_list = preview.querySelectorAll('.preview_item')
      this.resultData.forEach((r, i) => {
        const img = item_preview_list[i].childNodes[0]
        const label = item_preview_list[i].childNodes[1]

        img.src = r.img
        img.width = options.output[i].w
        img.height = options.output[i].h
        label.childNodes[0].data = img.width + 'x' + img.height
      })
      cb(this.resultData[0].img)
    }

  }

  save() {

    function transfertComplete() {
      flash.innerText = 'pictures are well send'
      flash.style.color = 'green'
      setTimeout(() => { // TODO must be replaced by transition
        flash.style.color = 'white'
      }, 2000)
    }

    function transfertFailed() {
      flash.innerText = 'error, pictures not send'
      flash.style.color = 'red'
      setTimeout(() => {
        flash.style.color = 'white'
      }, 2000)
    }

    const xhr = request()
    xhr.open('POST', options.dest, true)

    xhr.setRequestHeader('X-Requested-With','xmlhttprequest')
    if (options.csrf) xhr.setRequestHeader('X-CSRF-Token', options.csrf)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*')

    xhr.addEventListener('load', transfertComplete, false)
    xhr.addEventListener('error', transfertFailed, false)

    debug('data', { value: this.resultData })
    debug('send', JSON.stringify({ value: this.resultData }))
    xhr.send(JSON.stringify({
      value: this.resultData,
      payload: options.payload
    }))
  }

}
