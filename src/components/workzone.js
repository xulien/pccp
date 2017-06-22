import getElement from '../getElement'

const canvas_fg = exports.canvas_fg = getElement('canvas', { id: 'mask' })

const canvas_bg = exports.canvas_bg = getElement('canvas', { id: 'background' })
canvas_bg.style.position = canvas_fg.style.position = 'absolute'
canvas_bg.style.top = canvas_fg.style.top = 0
canvas_bg.style.left = canvas_fg.style.left = 0

exports.worklayer = getElement('img', { alt: 'no picture loaded' })
