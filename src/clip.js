export default class Clip {

  constructor(canvas, options) {

    this.selected =  { sx: 0, sy: 0, sw: 0, sh: 0 }

    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.options = options

    this.clip = {}

    this.debug = false

    this.output_ratio = options.output.w / options.output.h

    this.ctx.fillStyle = this.options.clip.s

    if (this.output_ratio > 1) {
      this.clip.w = this.canvas.width * 0.8
      this.clip.h = this.clip.w / this.output_ratio
    } else if (this.output_ratio < 1) {
      this.clip.h = this.canvas.height * 0.8
      this.clip.w = this.clip.h * this.output_ratio
    } else {
      this.clip.w = this.clip.h = this.canvas.height * 0.8
    }

    this.mousePos = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    }

    this.l = { x: 0, y: 0, w: 0, h: this.canvas.height }
    this.r = { x: 0, y: 0, w: 0, h: this.canvas.height }
    this.t = { x: 0, y: 0, w: 0, h: 0 }
    this.b = { x: 0, y: 0, w: 0, h: 0 }

    this.dragging = false

    // ========= event ================>
    this.canvas.addEventListener('mousedown', this.onDown.bind(this), false)
    this.canvas.addEventListener('mouseup', this.onUp.bind(this), false)
    this.canvas.addEventListener('mousemove', this.onMove.bind(this), false)
    this.canvas.addEventListener('wheel', this.onWheel.bind(this), false)
    this.canvas.addEventListener('mouseleave', this.onLeave.bind(this), false)

    this.draw()
  }

  draw() {
    this.l.w = this.mousePos.x - this.clip.w / 2

    this.r.x = this.mousePos.x + this.clip.w / 2
    this.r.w = this.canvas.width - this.clip.w - this.l.w

    this.t.x = this.l.w
    this.t.w = this.clip.w

    this.t.h = this.mousePos.y - (this.clip.h / 2)

    this.b.x = this.l.w
    this.b.w = this.clip.w
    this.b.y = this.t.h + this.clip.h
    this.b.h = this.canvas.height - this.b.y

    // left limit
    if (this.l.w < 0) {
      this.l.w = this.t.x = this.b.x = 0
      this.r.x = this.t.w = this.b.w = this.clip.w
    }

    // right limit
    if (this.r.w < 0) {
      this.r.x = 0
      this.l.w = this.t.x = this.b.x = this.canvas.width - this.clip.w
    }

    // top limit
    if (this.t.h < 0) {
      this.t.h = 0
      this.b.y = this.clip.h
      this.b.h = this.canvas.height - this.clip.h
    }

    // bottom limit
    if (this.b.h < 0) {
      this.b.h = 0
      this.t.h = this.canvas.height - this.clip.h
    }


    if (!this.debug) {
      this.selected = {
        sx: this.t.x,
        sy: this.t.h,
        sw: this.clip.w,
        sh: this.clip.h
      }
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.fillRect(this.l.x, this.l.y, this.l.w, this.l.h)
    this.ctx.fillRect(this.r.x, this.r.y, this.r.w, this.r.h)
    this.ctx.fillRect(this.t.x, this.t.y, this.t.w, this.t.h)
    this.ctx.fillRect(this.b.x, this.b.y, this.b.w, this.b.h)

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
    const reposition = this.canvas.getBoundingClientRect()
    this.mousePos = {
      x: event.pageX - reposition.left,
      y: event.pageY - reposition.top
    }
    this.draw()
  }

  onMove(event) {
    if (this.dragging) {
      this.dragging = true
      const reposition = this.canvas.getBoundingClientRect()
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
