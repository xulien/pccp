const debug = require('debug')('pccp:clip')

import { options } from './app'
import { canvas_fg } from './components/workzone'

export default class Clip {

  constructor() {

    this.selected =  { sx: 0, sy: 0, sw: 0, sh: 0 }

    this.ctx = canvas_fg.getContext('2d')

    this.clip = {}

    this.testing = false

    if (Array.isArray(options.output)) {
      this.output_ratio = options.output[0].w / options.output[0].h
    } else {
      this.output_ratio = options.output.w / options.output.h
    }

    this.ctx.fillStyle = options.clip.s

    if (this.output_ratio > 1) {
      this.clip.w = canvas_fg.width * 0.8
      this.clip.h = this.clip.w / this.output_ratio
    } else if (this.output_ratio < 1) {
      this.clip.h = canvas_fg.height * 0.8
      this.clip.w = this.clip.h * this.output_ratio
    } else {
      this.clip.w = this.clip.h = canvas_fg.height * 0.8
    }

    this.mousePos = {
      x: canvas_fg.width / 2,
      y: canvas_fg.height / 2
    }

    this.l = { x: 0, y: 0, w: 0, h: canvas_fg.height }
    this.r = { x: 0, y: 0, w: 0, h: canvas_fg.height }
    this.t = { x: 0, y: 0, w: 0, h: 0 }
    this.b = { x: 0, y: 0, w: 0, h: 0 }

    this.dragging = false

    // ========= event ================>
    canvas_fg.addEventListener('mousedown', this.onDown.bind(this), false)
    canvas_fg.addEventListener('mouseup', this.onUp.bind(this), false)
    canvas_fg.addEventListener('mousemove', this.onMove.bind(this), false)
    canvas_fg.addEventListener('wheel', this.onWheel.bind(this), false)
    canvas_fg.addEventListener('mouseleave', this.onLeave.bind(this), false)

    debug('init => output ratio', this.output_ratio)
    debug('init => mouse position', this.mousePos)
    debug('init => clip', this.clip)

    this.draw()
  }

  draw() {
    this.l.w = this.mousePos.x - this.clip.w / 2

    this.r.x = this.mousePos.x + this.clip.w / 2
    this.r.w = canvas_fg.width - this.clip.w - this.l.w

    this.t.x = this.l.w
    this.t.w = this.clip.w

    this.t.h = this.mousePos.y - (this.clip.h / 2)

    this.b.x = this.l.w
    this.b.w = this.clip.w
    this.b.y = this.t.h + this.clip.h
    this.b.h = canvas_fg.height - this.b.y

    // left limit
    if (this.l.w < 0) {
      this.l.w = this.t.x = this.b.x = 0
      this.r.x = this.t.w = this.b.w = this.clip.w
    }

    // right limit
    if (this.r.w < 0) {
      this.r.x = 0
      this.l.w = this.t.x = this.b.x = canvas_fg.width - this.clip.w
    }

    // top limit
    if (this.t.h < 0) {
      this.t.h = 0
      this.b.y = this.clip.h
      this.b.h = canvas_fg.height - this.clip.h
    }

    // bottom limit
    if (this.b.h < 0) {
      this.b.h = 0
      this.t.h = canvas_fg.height - this.clip.h
    }


    if (!this.testing) {
      this.selected = {
        sx: this.t.x,
        sy: this.t.h,
        sw: this.clip.w,
        sh: this.clip.h
      }
    }

    this.ctx.clearRect(0, 0, canvas_fg.width, canvas_fg.height)

    this.ctx.fillRect(this.l.x, this.l.y, this.l.w, this.l.h)
    this.ctx.fillRect(this.r.x, this.r.y, this.r.w, this.r.h)
    this.ctx.fillRect(this.t.x, this.t.y, this.t.w, this.t.h)
    this.ctx.fillRect(this.b.x, this.b.y, this.b.w, this.b.h)

    debug('draw => selected', this.selected)
  }

  onLeave() {
    this.dragging = false
  }

  onWheel(event) {
    if (event.deltaY < 0) this.zIn()
    else this.zOut()
    this.draw()
    event.preventDefault()
  }

  onUp() {
    this.dragging = false
  }

  onDown(event) {
    this.dragging = true
    const reposition = canvas_fg.getBoundingClientRect()
    this.mousePos = {
      x: event.pageX - reposition.left,
      y: event.pageY - reposition.top
    }
    this.draw()
  }

  onMove(event) {
    if (this.dragging) {
      this.dragging = true
      const reposition = canvas_fg.getBoundingClientRect()
      this.mousePos = {
        x: event.pageX - reposition.left,
        y: event.pageY - reposition.top
      }
      this.draw()
    }
  }

  zIn() {
    this.clip.w -= 1
    this.clip.h = this.clip.w / this.output_ratio
  }

  zOut() {
    this.clip.w += 1
    this.clip.h = this.clip.w / this.output_ratio
  }

}
